const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
require("pdfkit-table");
const pdf_config = require("./pdf_config.json");
const { createPdfHelper } = require("./arj-pdf-function");
const { log } = require("console");

const cmToPoints = (cm) => cm * 28.3465;

const pdf_build = (fields, callback) => {
  try {
    const timestamp = Date.now();
    const fileName = `output_${timestamp}.pdf`;
    const filePath = path.join("/tmp", fileName); // Use /tmp for Vercel

    const doc = new PDFDocument(pdf_config);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Register fonts
    const fontPath1 = path.join(__dirname, "fonts", "BalBharatiDev01.TTF");
    const fontPath2 = path.join(__dirname, "fonts", "BalBharatiDev02.TTF");
    if (fs.existsSync(fontPath1)) doc.registerFont("regular", fontPath1);
    if (fs.existsSync(fontPath2)) doc.registerFont("bold", fontPath2);

    const p = createPdfHelper(doc, cmToPoints);

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
      fs.readFile(filePath, (err, data) => {
        if (err) return callback(err);
        callback(null, data); // return PDF buffer
      });
    });

    writeStream.on("error", (err) => callback(err));
  } catch (err) {
    callback(err);
  }
};

module.exports = { pdf_build };
