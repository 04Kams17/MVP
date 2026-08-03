const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const pdf = require("pdf-parse");

const app = express();

const PORT = 5000;



app.use(cors());
app.use(express.json());


// Scope 1 factors:
// kg CO2e per unit of fuel

const SCOPE_1_FACTORS = {
  naturalGas: 5.31,
  gasoline: 8.89,
  diesel: 10.18,
};

// Scope 2 MVP factors:
// kg CO2e per kWh
//
// These are simplified state-level
// estimates for the MVP.

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
  NM: 0.40,
  NY: 0.20,
  NC: 0.36,
  ND: 0.58,
  OH: 0.50,
  OK: 0.45,
  OR: 0.18,
  PA: 0.39,
  RI: 0.25,
  SC: 0.40,
  SD: 0.46,
  TN: 0.39,
  TX: 0.42,
  UT: 0.48,
  VT: 0.10,
  VA: 0.34,
  WA: 0.11,
  WV: 0.68,
  WI: 0.45,
  WY: 0.62,
  DC: 0.30,
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
  const number = Number(value);

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
          .replace(/,/g, "");

      const number =
        Number(value);

      if (
        !Number.isNaN(number)
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

      

      const pdfData =
        await pdf(
          pdfBuffer
        );

      const extractedText =
        pdfData.text;

      // Normalize whitespace

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


app.listen(
  PORT,
  () => {
    console.log(
      `Backend running at http://localhost:${PORT}`
    );
  }
);