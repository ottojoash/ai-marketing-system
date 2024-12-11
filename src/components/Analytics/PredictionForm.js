import React, { useState } from "react";
import { submitPrediction } from "../../utils/api";

const PredictionForm = ({ onPrediction }) => {
  const [formData, setFormData] = useState({
    budget: "",
    platforms: "",
    duration: "",
    audience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const platformsArray = formData.platforms.split(",").map((p) => p.trim());
      const predictionData = { ...formData, platforms: platformsArray };
      const response = await submitPrediction(predictionData);
      onPrediction(response); // Pass prediction data to parent
    } catch (error) {
      alert("Failed to generate prediction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Platforms (comma-separated):</label>
        <input
          type="text"
          name="platforms"
          value={formData.platforms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Duration (days):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Audience:</label>
        <input
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Generate Prediction</button>
    </form>
  );
};

export default PredictionForm;
