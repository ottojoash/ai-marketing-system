const express = require("express");
const { protect } = require("../middleware/auth");
const Campaign = require("../models/campaign");
const router = express.Router();

// @route POST /api/campaigns
// @desc Create a new campaign
// @access Private
router.post("/", protect, async (req, res) => {
  const { name, description, startDate, endDate, budget, platforms } = req.body;

  try {
    const campaign = new Campaign({
      name,
      description,
      startDate,
      endDate,
      budget,
      platforms,
      createdBy: req.user._id, // User creating the campaign
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route GET /api/campaigns
// @desc Get all campaigns
// @access Private
router.get("/", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user._id });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route GET /api/campaigns/:id
// @desc Get a specific campaign
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign || campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route PUT /api/campaigns/:id
// @desc Update a campaign
// @access Private
router.put("/:id", protect, async (req, res) => {
  const { name, description, startDate, endDate, budget, platforms } = req.body;

  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign || campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.name = name || campaign.name;
    campaign.description = description || campaign.description;
    campaign.startDate = startDate || campaign.startDate;
    campaign.endDate = endDate || campaign.endDate;
    campaign.budget = budget || campaign.budget;
    campaign.platforms = platforms || campaign.platforms;

    const updatedCampaign = await campaign.save();
    res.status(200).json(updatedCampaign);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route DELETE /api/campaigns/:id
// @desc Delete a campaign
// @access Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign || campaign.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    await campaign.remove();
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
