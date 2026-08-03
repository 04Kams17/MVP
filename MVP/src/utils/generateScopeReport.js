import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function formatNumber(number) {
  return Number(number || 0).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 2,
    }
  );
}

function cleanFileName(text) {
  return String(text || "company")
    .trim()
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
}

export function generateScopeReport(result) {
  const doc = new jsPDF();

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  /*
    --------------------------------
    REPORT TITLE
    --------------------------------
  */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(20);

  doc.text(
    "Scope 1 + Scope 2",
    pageWidth / 2,
    18,
    {
      align: "center",
    }
  );

  doc.text(
    "Greenhouse Gas Emissions Report",
    pageWidth / 2,
    27,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(10);

  doc.text(
    "Estimated organizational emissions inventory",
    pageWidth / 2,
    35,
    {
      align: "center",
    }
  );

  /*
    --------------------------------
    INVENTORY INFORMATION
    --------------------------------
  */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(14);

  doc.text(
    "Inventory Information",
    14,
    48
  );

  autoTable(doc, {
    startY: 53,

    head: [
      [
        "Field",
        "Information",
      ],
    ],

    body: [
      [
        "Company",
        result.companyName ||
          "Not provided",
      ],

      [
        "Facility",
        result.facilityName ||
          "Not provided",
      ],

      [
        "Location",
        result.location ||
          "Not provided",
      ],

      [
        "Reporting Year",
        String(
          result.reportingYear ||
            "Not provided"
        ),
      ],

      [
        "Organizational Boundary",
        result.boundaryMethod ||
          "Not provided",
      ],

      [
        "Activity Data Source",
        result.dataSource ||
          "Not provided",
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [
        22,
        101,
        52,
      ],
    },
  });

  /*
    --------------------------------
    COMBINED SUMMARY
    --------------------------------
  */

  const summaryY =
    doc.lastAutoTable.finalY + 12;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(14);

  doc.text(
    "Emissions Summary",
    14,
    summaryY
  );

  autoTable(doc, {
    startY: summaryY + 5,

    head: [
      [
        "Category",
        "Metric Tons CO2e",
      ],
    ],

    body: [
      [
        "Scope 1 — Direct Emissions",
        formatNumber(
          result.totalScope1Tons
        ),
      ],

      [
        "Scope 2 — Purchased Electricity",
        formatNumber(
          result.totalScope2Tons
        ),
      ],

      [
        "Combined Scope 1 + Scope 2",
        formatNumber(
          result.combinedTotalTons
        ),
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [
        22,
        101,
        52,
      ],
    },

    didParseCell(data) {
      /*
        Make the combined total bold.
      */

      if (
        data.section === "body" &&
        data.row.index === 2
      ) {
        data.cell.styles.fontStyle =
          "bold";
      }
    },
  });

  /*
    --------------------------------
    SCOPE 1 BREAKDOWN
    --------------------------------
  */

  const scope1Y =
    doc.lastAutoTable.finalY + 12;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(14);

  doc.text(
    "Scope 1 — Direct Emissions",
    14,
    scope1Y
  );

  autoTable(doc, {
    startY: scope1Y + 5,

    head: [
      [
        "Emission Source",
        "Activity Data",
        "Emissions",
      ],
    ],

    body: [
      [
        "Natural Gas",
        `${formatNumber(
          result.naturalGas
        )} therms`,

        `${formatNumber(
          result.naturalGasEmissions
        )} kg CO2e`,
      ],

      [
        "Gasoline",
        `${formatNumber(
          result.gasoline
        )} gallons`,

        `${formatNumber(
          result.gasolineEmissions
        )} kg CO2e`,
      ],

      [
        "Diesel",
        `${formatNumber(
          result.diesel
        )} gallons`,

        `${formatNumber(
          result.dieselEmissions
        )} kg CO2e`,
      ],

      [
        "Total Scope 1",
        "",

        `${formatNumber(
          result.totalScope1Kg
        )} kg CO2e`,
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [
        22,
        101,
        52,
      ],
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.row.index === 3
      ) {
        data.cell.styles.fontStyle =
          "bold";
      }
    },
  });

  /*
    --------------------------------
    SCOPE 2 BREAKDOWN
    --------------------------------
  */

  const scope2Y =
    doc.lastAutoTable.finalY + 12;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(14);

  doc.text(
    "Scope 2 — Purchased Electricity",
    14,
    scope2Y
  );

  autoTable(doc, {
    startY: scope2Y + 5,

    head: [
      [
        "Field",
        "Information",
      ],
    ],

    body: [
      [
        "State",
        result.state ||
          "Not provided",
      ],

      [
        "Electricity Used",
        `${formatNumber(
          result.electricityUsage
        )} kWh`,
      ],

      [
        "Electricity Factor",
        `${formatNumber(
          result.electricityFactor
        )} kg CO2e/kWh`,
      ],

      [
        "Calculation Method",
        result.scope2Method ||
          "Location-based estimate",
      ],

      [
        "Scope 2 Emissions",
        `${formatNumber(
          result.totalScope2Kg
        )} kg CO2e`,
      ],

      [
        "Scope 2 Total",
        `${formatNumber(
          result.totalScope2Tons
        )} metric tons CO2e`,
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [
        3,
        105,
        161,
      ],
    },
  });

  /*
    --------------------------------
    ADD A NEW PAGE
    --------------------------------

    This keeps the methodology and
    disclaimer from being cut off
    when the report becomes longer.
  */

  doc.addPage();

  /*
    --------------------------------
    CALCULATION DETAILS
    --------------------------------
  */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(16);

  doc.text(
    "Calculation Methodology",
    14,
    20
  );

  autoTable(doc, {
    startY: 27,

    head: [
      [
        "Field",
        "Information",
      ],
    ],

    body: [
      [
        "Calculation Method",
        result.calculationMethod ||
          "Activity data × emission factor",
      ],

      [
        "Scope 1 Factor Source",
        result.scope1FactorSource ||
          "EPA GHG Emission Factors Hub",
      ],

      [
        "Scope 2 Factor Source",
        result.scope2FactorSource ||
          "State-level MVP electricity factor table",
      ],

      [
        "Scope 2 Method",
        result.scope2Method ||
          "Location-based estimate",
      ],

      [
        "Calculation Date",
        result.calculationDate ||
          new Date().toLocaleString(),
      ],

      [
        "Inventory Status",
        result.inventoryStatus ||
          "MVP estimate — not independently verified",
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [
        22,
        101,
        52,
      ],
    },
  });

  /*
    --------------------------------
    REPORTING NOTICE
    --------------------------------
  */

  const noticeY =
    doc.lastAutoTable.finalY + 14;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "Important Reporting Notice",
    14,
    noticeY
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  const notice =
    "This report is generated by an educational MVP and provides an estimated Scope 1 and Scope 2 greenhouse gas inventory. " +
    "The Scope 1 calculation currently includes natural gas, gasoline, and diesel. " +
    "The Scope 2 calculation currently uses a state-level location-based electricity factor. " +
    "This report is not independently verified and does not yet include every emissions category, facility consolidation rule, uncertainty assessment, or framework-specific disclosure requirement. " +
    "The inventory should be reviewed against the applicable reporting framework before official or regulatory use.";

  const noticeLines =
    doc.splitTextToSize(
      notice,
      pageWidth - 28
    );

  doc.text(
    noticeLines,
    14,
    noticeY + 7
  );

  /*
    --------------------------------
    FOOTERS
    --------------------------------
  */

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page += 1
  ) {
    doc.setPage(page);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8);

    doc.text(
      "Scope 1 + Scope 2 Emissions Calculator — MVP Report",
      pageWidth / 2,
      pageHeight - 10,
      {
        align: "center",
      }
    );

    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - 14,
      pageHeight - 10,
      {
        align: "right",
      }
    );
  }

  /*
    --------------------------------
    SAVE PDF
    --------------------------------
  */

  const companyFileName =
    cleanFileName(
      result.companyName
    );

  const reportingYear =
    result.reportingYear ||
    "report";

  doc.save(
    `${companyFileName}_scope_1_scope_2_${reportingYear}.pdf`
  );
}