const { text, underline } = require("pdfkit");

function createPdfHelper(doc, cmToPoints) {
  fontSize = 16;

  function br(pSpacing) {
    doc.moveDown(pSpacing);
  }

  return {
    Heading(heading) {
      doc
        .font(heading.bold ? "bold" : "regular")
        .fontSize(heading.size)
        .text(heading.text, { align: "center" });
      br(0.65);
    },
    ApplicantNumber(applicantNumber) {
      doc
        .font(applicantNumber.bold ? "bold" : "regular")
        .fontSize(applicantNumber.size - 2)
        .text(applicantNumber.text, { align: "right" });
      br(0.65);
    },

    To(to) {
      doc
        .font(to.bold ? "bold" : "regular")
        .fontSize(to.size)
        .table({
          rowStyles: { border: false, padding: [0, 0, 0, 0] },
          columnStyles: [doc.widthOfString("प्रति") + 4],
          data: [
            ["प्रति", ""],
            ["", { text: to.text, underline: to.underline }],
          ],
        });

      br(0.65);
    },

    ApplicantName(applicantName) {
      doc
        .font(applicantName.bold ? "bold" : "regular")
        .fontSize(applicantName.size)
        .table(
          {
            columnStyles: [doc.widthOfString("अर्जदाराचे नाव: ") + 4],
            rowStyles: { border: false, padding: [0, 0, 0, 0] },
            data: [[`अर्जदाराचे नाव: `, applicantName.text]],
          },
          { align: "justify", continued: true }
        );

      br(0.65);
    },

    RespondantName(respondantName) {
      doc
        .font(respondantName.bold ? "bold" : "regular")
        .fontSize(respondantName.size)
        .table(
          {
            columnStyles: [doc.widthOfString("सामनेवालाचे नाव: " + 4)],
            rowStyles: { border: false, padding: [0, 0, 0, 0] },
            data: [[`सामनेवालाचे नाव:`, respondantName.text]],
          },
          { align: "justify" }
        );

      br(0.65);
    },

    Subject(subject) {
      doc
        .font(subject.bold ? "bold" : "regular")
        .fontSize(subject.size)
        .text(`विषय: `, { continued: true });
      doc
        .font(subject.bold ? "bold" : "regular")
        .fontSize(subject.size)
        .text(subject.text, {
          underline: true,
          align: "justify",
          indentAllLines: 1,
        });

      br(0.65);
    },

    Application(application) {
      doc
        .font(application.bold ? "bold" : "regular")
        .fontSize(application.size)
        .text(`अर्ज: `, { continued: true });
      doc
        .font(application.bold ? "bold" : "regular")
        .fontSize(application.size)
        .text(application.text, {
          underline: true,
          align: "justify",
          indentAllLines: 1,
        });

      br(0.65);
    },

    Paragraph(paragraph) {
      doc
        .font(paragraph.bold ? "bold" : "regular")
        .fontSize(paragraph.size)
        .text(paragraph.text, {
          align: "justify",
          indent: cmToPoints(1),
        });

      br(0.65);
    },

    PlaceNDate(placeNDate) {
      doc
        .font(placeNDate.bold ? "bold" : "regular")
        .fontSize(placeNDate.size)
        .text(placeNDate.text);
      br(0.65);
    },

    Signature(signature) {
      doc
        .font(signature.bold ? "bold" : "regular")
        .fontSize(signature.size)
        .text(signature.text, { align: "right" });

      br(0.65);
    },

    Dispatched(dispatched) {
      doc.font("bold").fontSize(dispatched.size).text("माहिती स्थव प्रत रवाना");
      doc
        .font(dispatched.bold ? "bold" : "regular")
        .fontSize(dispatched.size)
        .table({
          rowStyles: { border: false, padding: [0, 0, 0, 0] },
          data: [[dispatched]],
        });

      br(0.65);
    },
    BondSpacing(bondSpacing) {
      doc.y += bondSpacing.text * 28.35;
    },
  };
}

module.exports = { createPdfHelper };
