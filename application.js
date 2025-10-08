import { pdf_build } from "../../pdf-builder-file";

export default async function handler(req, res) {
  //   if (req.method !== "POST") {
  //     return res.status(405).json({ error: "Method not allowed" });
  //   }

  const fields = req.body;

  pdf_build(fields, (err, pdfBuffer) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to generate PDF" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
    res.send(pdfBuffer);
  });
}
