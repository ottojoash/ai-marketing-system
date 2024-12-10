const express = require("express");
const { protect } = require("../middleware/auth");
const { Configuration, OpenAIApi } = require("openai");
const Prediction = require("../models/prediction"); // Import the Prediction model
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
  
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a marketing performance predictor." },
          { role: "user", content: prompt },
        ],
        max_tokens: 200,
      });
  
      if (!response || !response.data || !response.data.choices || response.data.choices.length === 0) {
        throw new Error("Invalid response from OpenAI.");
      }
  
      const analytics = response.data.choices[0].message.content.trim();
  
      // Save the prediction with the user's ID
      const prediction = new Prediction({
        budget,
        platforms,
        duration,
        audience,
        analytics,
        createdBy: req.user._id, // Attach the user's ID
      });
  
      await prediction.save();
  
      res.status(200).json({ analytics, savedPrediction: prediction });
    } catch (err) {
      console.error("Error calling OpenAI API:", err.response ? err.response.data : err.message);
      res.status(500).json({ message: "Error generating predictions.", error: err.message });
    }
  });
  

// Route to fetch all predictions
router.get("/predictions", protect, async (req, res) => {
    try {
      // Fetch predictions created by the authenticated user
      const predictions = await Prediction.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
      res.status(200).json(predictions);
    } catch (err) {
      console.error("Error fetching predictions:", err.message);
      res.status(500).json({ message: "Error fetching predictions." });
    }
  });
  

module.exports = router;
