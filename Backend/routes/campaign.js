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
      console.log("Files uploaded:", req.files); // Debugging: Log req.files
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      const imagePaths = req.files.map((file) => file.path); // Extract file paths
      const { name, description, startDate, endDate, budget, platforms } = req.body;
  
      const campaign = new Campaign({
        name,
        description,
        startDate,
        endDate,
        budget,
        platforms,
        images: imagePaths, // Save image paths
        createdBy: req.user._id,
      });
  
      await campaign.save();
      res.status(201).json(campaign);
    } catch (err) {
      console.error("Error:", err.message); // Debug: Log errors
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
  

module.exports = router;
