const express = require("express");
const { protect } = require("../middleware/auth");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();
const router = express.Router();

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route for predictions and analytics
router.post("/predict", protect, async (req, res) => {
  const { budget, platforms, duration, audience } = req.body;

  if (!budget || !platforms || !duration) {
    return res.status(400).json({ message: "Budget, platforms, and duration are required." });
  }

  try {
    // Create the prompt for OpenAI
    const prompt = `
      Predict the campaign performance for the following details:
      - Budget: ${budget}
      - Platforms: ${platforms.join(", ")}
      - Duration: ${duration} days
      - Target Audience: ${audience || "General"}
      
      Provide:
      - Predicted reach (in numbers)
      - Predicted engagement rate (as a percentage)
      - Suggested platform with highest ROI.
    `;

    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a marketing performance predictor." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    // Extract AI-generated analytics
    const analytics = response.data.choices[0].message.content.trim();

    res.status(200).json({ analytics });
  } catch (err) {
    console.error("Error calling OpenAI API:", err.response ? err.response.data : err.message);
    res.status(500).json({ message: "Error generating predictions.", error: err.message });
  }
});

module.exports = router;
