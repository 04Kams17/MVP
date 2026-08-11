const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 5000;



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



app.use(cors());
app.use(express.json());



async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn(
      "DATABASE_URL is not set. Authentication routes will not work."
    );

    return;
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Users table ready.");
  } catch (error) {
    console.error(
      "Database initialization error:",
      error
    );
  }
}



function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured."
    );
  }

  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}



const SCOPE_1_FACTORS = {
  naturalGas: 5.31,
  gasoline: 8.89,
  diesel: 10.18,
};



const STATE_ELECTRICITY_FACTORS = {
  AL: 0.39,
  AK: 0.33,
  AZ: 0.38,
  AR: 0.42,
  CA: 0.22,
  CO: 0.47,
  CT: 0.24,
  DE: 0.38,
  FL: 0.36,
  GA: 0.37,
  HI: 0.56,
  ID: 0.12,
  IL: 0.33,
  IN: 0.59,
  IA: 0.42,
  KS: 0.48,
  KY: 0.62,
  LA: 0.43,
  ME: 0.21,
  MD: 0.34,
  MA: 0.25,
  MI: 0.48,
  MN: 0.39,
  MS: 0.43,
  MO: 0.53,
  MT: 0.38,
  NE: 0.46,
  NV: 0.35,
  NH: 0.18,
  NJ: 0.23,
  NM: 0.4,
  NY: 0.2,
  NC: 0.36,
  ND: 0.58,
  OH: 0.5,
  OK: 0.45,
  OR: 0.18,
  PA: 0.39,
  RI: 0.25,
  SC: 0.4,
  SD: 0.46,
  TN: 0.39,
  TX: 0.42,
  UT: 0.48,
  VT: 0.1,
  VA: 0.34,
  WA: 0.11,
  WV: 0.68,
  WI: 0.45,
  WY: 0.62,
  DC: 0.3,
};



const uploadsFolder = path.join(
  __dirname,
  "uploads"
);

const extractedFolder = path.join(
  __dirname,
  "extracted"
);

fs.mkdirSync(
  uploadsFolder,
  {
    recursive: true,
  }
);

fs.mkdirSync(
  extractedFolder,
  {
    recursive: true,
  }
);



const storage = multer.diskStorage({
  destination: (
    req,
    file,
    callback
  ) => {
    callback(
      null,
      uploadsFolder
    );
  },

  filename: (
    req,
    file,
    callback
  ) => {
    const safeName =
      file.originalname.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      );

    const uniqueName =
      `${Date.now()}-${safeName}`;

    callback(
      null,
      uniqueName
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    callback
  ) => {
    if (
      file.mimetype !==
      "application/pdf"
    ) {
      callback(
        new Error(
          "Only PDF files are allowed."
        )
      );

      return;
    }

    callback(
      null,
      true
    );
  },
});


function toNumber(value) {
  const number =
    Number(value);

  if (
    Number.isNaN(number) ||
    number < 0
  ) {
    return 0;
  }

  return number;
}

function findNumber(
  text,
  patterns
) {
  for (
    const pattern of patterns
  ) {
    const match =
      text.match(pattern);

    if (match) {
      const value =
        match[1]
          .replace(
            /,/g,
            ""
          );

      const number =
        Number(value);

      if (
        !Number.isNaN(
          number
        )
      ) {
        return number;
      }
    }
  }

  return null;
}

function findText(
  text,
  patterns
) {
  for (
    const pattern of patterns
  ) {
    const match =
      text.match(pattern);

    if (
      match &&
      match[1]
    ) {
      return match[1]
        .trim()
        .replace(
          /\s+/g,
          " "
        );
    }
  }

  return "";
}



app.get(
  "/",
  (
    req,
    res
  ) => {
    res.json({
      message:
        "Emissions calculator backend is running.",
    });
  }
);



app.post(
  "/api/signup",
  async (
    req,
    res
  ) => {
    try {
      const email =
        normalizeEmail(
          req.body.email
        );

      const password =
        String(
          req.body.password || ""
        );

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Email and password are required.",
          });
      }

      if (
        !email.includes("@")
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please enter a valid email address.",
          });
      }

      if (
        password.length < 8
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Password must be at least 8 characters long.",
          });
      }

     

      const existingUser =
        await pool.query(
          `
            SELECT id
            FROM users
            WHERE email = $1
          `,
          [email]
        );

      if (
        existingUser.rows.length >
        0
      ) {
        return res
          .status(409)
          .json({
            success: false,

            message:
              "An account with that email already exists.",
          });
      }

      

      const passwordHash =
        await bcrypt.hash(
          password,
          12
        );

      // Create user

      const insertedUser =
        await pool.query(
          `
            INSERT INTO users (
              email,
              password_hash
            )
            VALUES ($1, $2)
            RETURNING
              id,
              email,
              created_at
          `,
          [
            email,
            passwordHash,
          ]
        );

      const user =
        insertedUser.rows[0];

      

      const token =
        createToken(user);

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Account created successfully.",

          token,

          user: {
            id:
              user.id,

            email:
              user.email,

            createdAt:
              user.created_at,
          },
        });
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      

      if (
        error.code ===
        "23505"
      ) {
        return res
          .status(409)
          .json({
            success: false,

            message:
              "An account with that email already exists.",
          });
      }

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Account creation failed.",
        });
    }
  }
);


app.post(
  "/api/login",
  async (
    req,
    res
  ) => {
    try {
      const email =
        normalizeEmail(
          req.body.email
        );

      const password =
        String(
          req.body.password || ""
        );

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Email and password are required.",
          });
      }

      const userResult =
        await pool.query(
          `
            SELECT
              id,
              email,
              password_hash,
              created_at
            FROM users
            WHERE email = $1
          `,
          [email]
        );

      if (
        userResult.rows.length ===
        0
      ) {
        return res
          .status(401)
          .json({
            success: false,

            message:
              "Invalid email or password.",
          });
      }

      const user =
        userResult.rows[0];

      const passwordMatches =
        await bcrypt.compare(
          password,
          user.password_hash
        );

      if (
        !passwordMatches
      ) {
        return res
          .status(401)
          .json({
            success: false,

            message:
              "Invalid email or password.",
          });
      }

      const token =
        createToken(user);

      return res.json({
        success: true,

        message:
          "Login successful.",

        token,

        user: {
          id:
            user.id,

          email:
            user.email,

          createdAt:
            user.created_at,
        },
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Login failed.",
        });
    }
  }
);


app.post(
  "/api/calculate",
  (
    req,
    res
  ) => {
    try {
      const {
        companyName,
        facilityName,
        location,
        reportingYear,
        boundaryMethod,
        dataSource,

        naturalGas,
        gasoline,
        diesel,

        electricityUsage,
        state,
      } = req.body;

  
      const naturalGasAmount =
        toNumber(
          naturalGas
        );

      const gasolineAmount =
        toNumber(
          gasoline
        );

      const dieselAmount =
        toNumber(
          diesel
        );

      const naturalGasEmissions =
        naturalGasAmount *
        SCOPE_1_FACTORS
          .naturalGas;

      const gasolineEmissions =
        gasolineAmount *
        SCOPE_1_FACTORS
          .gasoline;

      const dieselEmissions =
        dieselAmount *
        SCOPE_1_FACTORS
          .diesel;

      const totalScope1Kg =
        naturalGasEmissions +
        gasolineEmissions +
        dieselEmissions;

      const totalScope1Tons =
        totalScope1Kg /
        1000;


      const electricityAmount =
        toNumber(
          electricityUsage
        );

      const stateCode =
        String(
          state || ""
        )
          .trim()
          .toUpperCase();

      const electricityFactor =
        STATE_ELECTRICITY_FACTORS[
          stateCode
        ] ??
        0.4;

      const totalScope2Kg =
        electricityAmount *
        electricityFactor;

      const totalScope2Tons =
        totalScope2Kg /
        1000;


      const combinedTotalKg =
        totalScope1Kg +
        totalScope2Kg;

      const combinedTotalTons =
        combinedTotalKg /
        1000;
     

      return res.json({
        success: true,

        companyName:
          companyName || "",

        facilityName:
          facilityName || "",

        location:
          location || "",

        reportingYear:
          reportingYear || "",

        boundaryMethod:
          boundaryMethod ||
          "Operational control",

        dataSource:
          dataSource ||
          "Estimated data",

        naturalGas:
          naturalGasAmount,

        gasoline:
          gasolineAmount,

        diesel:
          dieselAmount,

        electricityUsage:
          electricityAmount,

        state:
          stateCode,

        naturalGasEmissions,

        gasolineEmissions,

        dieselEmissions,

        totalScope1Kg,

        totalScope1Tons,

        electricityFactor,

        totalScope2Kg,

        totalScope2Tons,

        combinedTotalKg,

        combinedTotalTons,

        calculationMethod:
          "Activity data × emission factor",

        scope1FactorSource:
          "EPA GHG Emission Factors Hub",

        scope2FactorSource:
          "State-level electricity factor table (MVP estimate)",

        scope2Method:
          "Location-based estimate",

        calculationDate:
          new Date()
            .toLocaleString(),

        inventoryStatus:
          "MVP estimate — not independently verified",
      });
    } catch (error) {
      console.error(
        "Calculation error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "The emissions calculation failed.",
        });
    }
  }
);



app.post(
  "/api/upload-pdf",
  upload.single("pdf"),
  async (
    req,
    res
  ) => {
    try {
      if (
        !req.file
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "No PDF was uploaded.",
          });
      }


     const pdfBuffer =
  fs.readFileSync(
    req.file.path
  );

const parser =
  new PDFParse({
    data: pdfBuffer,
  });

const pdfData =
  await parser.getText();

const extractedText =
  pdfData.text;

await parser.destroy();

      const normalizedText =
        extractedText
          .replace(
            /\s+/g,
            " "
          )
          .trim();

     

      const extractedFields = {
        electricityUsage:
          findNumber(
            normalizedText,
            [
              /(?:electricity|electric|energy)\s*(?:usage|use|consumption)?\s*[:#-]?\s*([\d,]+(?:\.\d+)?)\s*kwh/i,

              /([\d,]+(?:\.\d+)?)\s*kwh/i,
            ]
          ),

        naturalGas:
          findNumber(
            normalizedText,
            [
              /(?:natural\s*gas)\s*(?:usage|use|consumption)?\s*[:#-]?\s*([\d,]+(?:\.\d+)?)\s*therms?/i,

              /([\d,]+(?:\.\d+)?)\s*therms?/i,
            ]
          ),

        gasoline:
          findNumber(
            normalizedText,
            [
              /(?:gasoline)\s*(?:usage|use|consumption)?\s*[:#-]?\s*([\d,]+(?:\.\d+)?)\s*gallons?/i,
            ]
          ),

        diesel:
          findNumber(
            normalizedText,
            [
              /(?:diesel)\s*(?:usage|use|consumption)?\s*[:#-]?\s*([\d,]+(?:\.\d+)?)\s*gallons?/i,
            ]
          ),

        reportingYear:
          findNumber(
            normalizedText,
            [
              /(?:reporting\s*year|billing\s*year)\s*[:#-]?\s*(20\d{2})/i,
            ]
          ),

        companyName:
          findText(
            normalizedText,
            [
              /(?:company|customer|account\s*name)\s*[:#-]\s*([A-Za-z0-9&.,' -]{2,60})/i,
            ]
          ),

        facilityName:
          findText(
            normalizedText,
            [
              /(?:facility|site|building)\s*[:#-]\s*([A-Za-z0-9&.,' -]{2,60})/i,
            ]
          ),
      };

   

      const textFileName =
        req.file.filename.replace(
          /\.pdf$/i,
          ".txt"
        );

      const textFilePath =
        path.join(
          extractedFolder,
          textFileName
        );

      fs.writeFileSync(
        textFilePath,
        extractedText,
        "utf8"
      );

    

      return res
        .status(200)
        .json({
          success: true,

          message:
            "PDF uploaded and read successfully.",

          extractedFields,

          file: {
            originalName:
              req.file
                .originalname,

            storedName:
              req.file
                .filename,

            size:
              req.file
                .size,
          },

          extraction: {
            pageCount:
              pdfData.numpages,

            characterCount:
              extractedText.length,

            textPreview:
              extractedText
                .slice(
                  0,
                  500
                ),
          },
        });
    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "The PDF was uploaded, but its text could not be extracted.",

          error:
            error.message,
        });
    }
  }
);



app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    if (
      error instanceof
      multer.MulterError
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            error.message,
        });
    }

    if (
      error
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            error.message ||
            "Upload failed.",
        });
    }

    next();
  }
);



initializeDatabase();



app.listen(
  PORT,
  () => {
    console.log(
      `Backend running on port ${PORT}`
    );
  }
);