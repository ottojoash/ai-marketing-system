import React, { useState } from "react";
import PredictionForm from "../components/Analytics/PredictionForm";
import PredictionList from "../components/Analytics/PredictionList";

const Analytics = () => {
  const [newPrediction, setNewPrediction] = useState(null);

  const handleNewPrediction = (prediction) => {
    alert("Prediction generated successfully!");
    setNewPrediction(prediction); // Refresh predictions if needed
  };

  return (
    <div>
      <h1>Campaign Analytics</h1>
      <PredictionForm onPrediction={handleNewPrediction} />
      <PredictionList />
    </div>
  );
};

export default Analytics;
