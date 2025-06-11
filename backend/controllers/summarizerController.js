const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

console.log('Gemini API Key Loaded:', process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // You can upgrade to "gemini-2.0-pro" if needed

const summarizeDocument = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file provided" });

  try {
    let text = '';
    const ext = path.extname(file.originalname).toLowerCase();

    // Extract text from PDF or TXT
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === '.txt') {
      text = fs.readFileSync(file.path, 'utf-8');
    } else {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: "Unsupported file type. Upload a PDF or TXT file." });
    }

    // Delete uploaded file after reading
    fs.unlinkSync(file.path);

    if (!text || text.length < 20) {
      return res.status(400).json({ message: "Text could not be extracted or is too short." });
    }

    // Optional: Trim very long text (to avoid API overload)
    if (text.length > 5000) {
      text = text.slice(0, 5000) + "\n\n[Truncated for summary]";
    }

    // Build prompt for Gemini
    const prompt = `
      Summarize the following document in clear and concise bullet points.
      Also provide a short paragraph summary at the start.
      TEXT: """${text}"""
    `;

    // Call Gemini model
    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    // Ensure valid string
    if (typeof summaryText !== 'string') {
      throw new Error('Gemini API did not return a valid string summary');
    }

    // Clean up any markdown fences or backticks
    const cleanSummary = summaryText.replace(/```(?:markdown|text)?|```/g, "").trim();

    console.log("✅ Summary generated successfully");

    return res.json({ summary: cleanSummary });

  } catch (error) {
    console.error("❌ Error summarizing document:", error);
    return res.status(500).json({
      message: "AI summarization failed",
      error: error.message,
    });
  }
};

module.exports = { summarizeDocument };
