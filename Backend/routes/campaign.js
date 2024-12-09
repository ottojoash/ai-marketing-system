const express = require("express");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload"); // Import upload middleware
const Campaign = require("../models/campaign");
const router = express.Router();

// @route POST /api/campaigns
// @desc Create a new campaign with image upload
// @access Private
router.post("/", protect, upload.array("images", 5), async (req, res) => {
    try {
      const { name, description, startDate, endDate, budget } = req.body;
      let { platforms } = req.body;
  
      // Check and convert platforms to an array if it's a string
      if (typeof platforms === "string") {
        platforms = platforms.split(",").map((platform) => platform.trim());
      }
  
      // Handle missing fields
      if (!name || !description || !startDate || !endDate || !budget || !platforms) {
        return res.status(400).json({ message: "All fields except images are required." });
      }
  
      // Check for uploaded files
      const imagePaths = req.files ? req.files.map((file) => file.path) : [];
  
      // Create the campaign
      const campaign = new Campaign({
        name,
        description,
        startDate,
        endDate,
        budget,
        platforms,
        images: imagePaths,
        createdBy: req.user._id,
      });
  
      await campaign.save();
      res.status(201).json(campaign);
    } catch (err) {
      console.error("Error posting campaign:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

// @route PUT /api/campaigns/:id
// @desc Update a campaign with image upload
// @access Private
router.put("/:id", protect, upload.array("images", 5), async (req, res) => {
  const { name, description, startDate, endDate, budget, platforms } = req.body;

  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign || campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const imagePaths = req.files.map((file) => file.path); // Get file paths

    // Update campaign fields
    campaign.name = name || campaign.name;
    campaign.description = description || campaign.description;
    campaign.startDate = startDate || campaign.startDate;
    campaign.endDate = endDate || campaign.endDate;
    campaign.budget = budget || campaign.budget;
    campaign.platforms = platforms || campaign.platforms;

    // Merge new images with existing ones
    campaign.images = [...campaign.images, ...imagePaths];

    const updatedCampaign = await campaign.save();
    res.status(200).json(updatedCampaign);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route GET /api/campaigns
// @desc Get all campaigns with pagination
// @access Private
router.get("/", protect, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default page 1
      const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
      const skip = (page - 1) * limit;
  
      const campaigns = await Campaign.find({ createdBy: req.user._id })
        .skip(skip)
        .limit(limit);
  
      const total = await Campaign.countDocuments({ createdBy: req.user._id });
  
      res.status(200).json({
        campaigns,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // @route GET /api/campaigns/filter
// @desc Get campaigns with filtering options
// @access Private
router.get("/filter", protect, async (req, res) => {
    try {
      const { platforms, startDate, endDate } = req.query;
      const query = { createdBy: req.user._id };
  
      if (platforms) {
        query.platforms = { $in: platforms.split(",") }; // Filter by platforms
      }
      if (startDate) {
        query.startDate = { $gte: new Date(startDate) }; // Start date on or after
      }
      if (endDate) {
        query.endDate = { $lte: new Date(endDate) }; // End date on or before
      }
  
      const campaigns = await Campaign.find(query);
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // @route GET /api/campaigns/analytics
// @desc Get campaign analytics
// @access Private
router.get("/analytics", protect, async (req, res) => {
    try {
      const campaigns = await Campaign.find({ createdBy: req.user._id });
  
      const totalCampaigns = campaigns.length;
      const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
      const campaignsByPlatform = {};
  
      campaigns.forEach((campaign) => {
        campaign.platforms.forEach((platform) => {
          campaignsByPlatform[platform] = (campaignsByPlatform[platform] || 0) + 1;
        });
      });
  
      res.status(200).json({
        totalCampaigns,
        totalBudget,
        campaignsByPlatform,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  router.put("/:id", protect, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const campaign = await Campaign.findById(id);
  
      if (!campaign || campaign.createdBy.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      Object.keys(updates).forEach((key) => {
        campaign[key] = updates[key]; // Apply updates dynamically
      });
  
      const updatedCampaign = await campaign.save();
      res.status(200).json(updatedCampaign);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

   // @route Post /api/campaigns/recommendations
// @desc Post campaign recommendations
// @access Private
router.post("/recommendations", protect, async (req, res) => {
    try {
      const { goal, budget } = req.body;
  
      if (!goal || !budget) {
        return res.status(400).json({ message: "Goal and budget are required." });
      }
  
      // Example AI-like recommendations
      const recommendations = [];
      if (goal.toLowerCase().includes("engagement")) {
        recommendations.push("Focus on Instagram and TikTok for better engagement.");
      }
      if (goal.toLowerCase().includes("sales")) {
        recommendations.push("Allocate more budget to Google Ads for higher conversion rates.");
      }
      if (budget < 1000) {
        recommendations.push("Consider email marketing or organic social media for cost-efficiency.");
      }
  
      res.status(200).json({ recommendations });
    } catch (err) {
      console.error("Error generating recommendations:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  
  
  
  

module.exports = router;
