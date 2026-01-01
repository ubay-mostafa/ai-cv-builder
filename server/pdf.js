const PDFDocument = require("pdfkit");

function generateCVPdf(res, cvText) {
  const doc = new PDFDocument();

  // Tell browser this is a PDF file
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");

  doc.pipe(res);

  doc
    .fontSize(20)
    .text("Curriculum Vitae", { align: "center" })
    .moveDown();

  doc.fontSize(12).text(cvText, {
    align: "left",
  });

  doc.end();
}

module.exports = { generateCVPdf };
