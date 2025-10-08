const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
require("pdfkit-table");
const { exec } = require("child_process");
const pdf_config = require("./pdf_config.json");
const { createPdfHelper } = require("./arj-pdf-function");
const { log } = require("console");
const cmToPoints = (cm) => cm * 28.3465;

const pdf_build = (fields, callback) => {
  const timestamp = Date.now();
  const fileName = `output_${timestamp}.pdf`;
  const filePath = path.join(__dirname, "pdf", fileName);

  const doc = new PDFDocument(pdf_config);

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  //#region access font and register
  const getFontPath1 = () => {
    const fontFile = path.join(__dirname, "fonts", "BalBharatiDev01.TTF");
    if (fs.existsSync(fontFile)) return fontFile;
    console.warn(
      "Warning: Font file marathi.ttf not found. Using default font."
    );
    return null;
  };

  const getFontPath2 = () => {
    const fontFile = path.join(__dirname, "fonts", "BalBharatiDev02.TTF");
    if (fs.existsSync(fontFile)) return fontFile;
    console.warn(
      "Warning: Font file marathi-bold.ttf not found. Using default font."
    );
    return null;
  };

  const fontPath1 = getFontPath1();
  const fontPath2 = getFontPath2();
  if (fontPath1) doc.registerFont("regular", fontPath1);
  if (fontPath2) doc.registerFont("bold", fontPath2);
  //#endregion

  p = createPdfHelper(doc, cmToPoints);

  fields.forEach((field) => {
    switch (field.name) {
      case "Heading":
        p.Heading(field);
        break;
      case "Application Number":
        p.ApplicationNumber(field);
        break;
      case "Paragraph":
        p.Paragraph(field);
        break;
      case "To":
        p.To(field);
        break;
      case "Applicant Name":
        p.ApplicantName(field);
        break;
      case "Subject":
        p.Subject(field);
        break;
      case "Responder Name":
        p.RespondantName(field);
        break;
      case "BondSpacing":
        p.BondSpacing(field);
        break;
      case "Date N Place":
        p.PlaceNDate(field);
        break;
      case "Signature":
        p.Signature(field);
        break;
      default:
        log(field);
        break;
    }
  });

  doc.end();

  writeStream.on("finish", () => {
    // exec(`start "" "${filePath}"`, (err) => {
    //   if (err) {
    //     console.error("Error opening PDF:", err);
    //   } else {
    //     console.log("PDF opened successfully.");
    //   }
    // });
    writeStream.on("error", (err) => {
      console.error("Error saving PDF:", err.message);
    });

    const publicUrl = `/pdfs/${fileName}`; // relative URL
    callback(null, publicUrl);
  });

  writeStream.on("error", (err) => {
    callback(err);
  });
};

module.exports = { pdf_build };
