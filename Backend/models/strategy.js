const mongoose = require("mongoose");

const strategySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  steps: { type: [String], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Strategy", strategySchema);