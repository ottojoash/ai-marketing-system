const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  budget: { type: Number, required: true },
  platforms: { type: [String], required: true },
  duration: { type: Number, required: true },
  audience: { type: String, default: "General" },
  analytics: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", predictionSchema);
