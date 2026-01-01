require("dotenv").config();
const { generateCVPdf } = require("./pdf");

const express = require("express");
const cors = require("cors");

const { generateCV } = require("./ai");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // 👈 THIS IS THE KEY
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/generate", async (req, res) => {
    try {
      const { name, job, skills } = req.body;
  
      const cvText = await generateCV({ name, job, skills });
  
      res.json({
        message: "AI-generated CV",
        cv: cvText,
      });
    } catch (error) {
      console.error("AI ERROR:", error.code);
  
      // 👇 Fallback mock response
      res.json({
        message: "AI-generated CV (demo mode)",
        cv: `
  ${req.body.name} – ${req.body.job}
  
  Professional Summary:
  Motivated ${req.body.job} with strong skills in ${req.body.skills}.
  Passionate about learning, problem-solving, and contributing to team success.
  
  Skills:
  - ${req.body.skills.split(",").join("\n- ")}
  
  Experience:
  - Academic and personal projects
  - Strong foundation in modern tools
        `,
      });
    }
  });
  
  app.post("/download-pdf", (req, res) => {
    const { cv } = req.body;
  
    if (!cv) {
      return res.status(400).json({ error: "No CV content provided" });
    }
  
    generateCVPdf(res, cv);
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
