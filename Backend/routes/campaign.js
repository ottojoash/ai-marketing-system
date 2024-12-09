const express = require("express");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload"); // Import upload middleware
const Campaign = require("../models/campaign");
const router = express.Router();

// @route POST /api/campaigns
// @desc Create a new campaign with image upload
// @access Private
router.post("/", protect, upload.array("images", 5), async (req, res) => {
  const { name, description, startDate, endDate, budget, platforms } = req.body;

  try {
    const imagePaths = req.files.map((file) => file.path); // Get file paths

    const campaign = new Campaign({
      name,
      description,
      startDate,
      endDate,
      budget,
      platforms,
      images: imagePaths, // Save image paths
      createdBy: req.user._id, // User creating the campaign
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
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

module.exports = router;
