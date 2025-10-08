const express = require("express");

const path = require("path");
const { pdf_build } = require("./pdf-builder-file"); // your module
const { log } = require("console");
const app = express();

app.use(express.json());
app.use("/pdfs", express.static(path.join(__dirname, "pdf"))); // Serve static PDF files

app.get("/", (req, res) => {
  res.send("Server API Working");
});
app.post("/api/application", (req, res) => {
  const fields = req.body;
  log(req.body);
  ``;
  pdf_build(fields, (err, fileUrl) => {
    if (err) {
      return res.status(500).json({ error: "Failed to generate PDF" });
    }
    log(fileUrl);
    res.json({ downloadUrl: fileUrl });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
