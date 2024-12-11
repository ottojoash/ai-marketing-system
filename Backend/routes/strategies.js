const express = require("express");
const { protect } = require("../middleware/auth");
const Strategy = require("../models/strategy");
const { generateStrategy } = require("../helpers/ai");
const router = express.Router();

// Create a new strategy
router.post("/", protect, async (req, res) => {
  try {
    const { name, description, steps } = req.body;

    if (!name || !description || !steps) {
      return res.status(400).json({ message: "Name, description, and steps are required." });
    }

    const strategy = new Strategy({
      name,
      description,
      steps,
      createdBy: req.user._id
    });

    await strategy.save();
    res.status(201).json(strategy);
  } catch (err) {
    console.error("Error creating strategy:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all strategies for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const strategies = await Strategy.find({ createdBy: req.user._id });
    res.status(200).json(strategies);
  } catch (err) {
    console.error("Error fetching strategies:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/suggest", protect, async (req, res) => {
    try {
      const { goal, audience, budget } = req.body;
  
      if (!goal || !audience || !budget) {
        return res.status(400).json({ message: "Goal, audience, and budget are required." });
      }
  
      // Example suggestion logic (can be replaced with AI/ML later)
      const suggestions = [];
      if (goal.toLowerCase().includes("engagement")) {
        suggestions.push("Focus on short, engaging videos for platforms like TikTok and Instagram.");
        suggestions.push("Run contests or polls to increase audience participation.");
      }
      if (goal.toLowerCase().includes("sales")) {
        suggestions.push("Leverage Google Ads for high-intent customers.");
        suggestions.push("Optimize landing pages with clear CTAs and A/B testing.");
      }
      if (budget < 1000) {
        suggestions.push("Consider organic marketing through content creation and email campaigns.");
      } else {
        suggestions.push("Use a mix of paid ads on Facebook and Google for higher reach.");
      }
  
      res.status(200).json({ suggestions });
    } catch (err) {
      console.error("Error generating strategy suggestions:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

router.get("/templates", protect, async (req, res) => {
    try {
      const templates = [
        {
          id: 1,
          name: "Engagement Boost",
          description: "Strategies to increase audience engagement.",
          steps: [
            "Create engaging Instagram Stories with polls or questions.",
            "Run a giveaway on Facebook.",
            "Post short videos on TikTok to connect with younger audiences."
          ]
        },
        {
          id: 2,
          name: "Conversion Optimization",
          description: "Strategies to convert visitors into customers.",
          steps: [
            "Use targeted Google Ads campaigns.",
            "Offer limited-time discounts on your landing pages.",
            "Leverage email retargeting for abandoned carts."
          ]
        }
      ];
  
      res.status(200).json({ templates });
    } catch (err) {
      console.error("Error fetching templates:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });


// AI-powered strategy generation
router.post("/ai-generate", protect, async (req, res) => {
  const { goal, audience, budget } = req.body;

  if (!goal || !audience || !budget) {
    return res.status(400).json({ message: "Goal, audience, and budget are required." });
  }

  try {
    const strategy = await generateStrategy(goal, audience, budget);
    res.status(200).json({ strategy });
  } catch (err) {
    console.error("Error generating strategy:", err.message);
    res.status(500).json({ message: "Server error during AI generation." });
  }
});

module.exports = router;

  
  
