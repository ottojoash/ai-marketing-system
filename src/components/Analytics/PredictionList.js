import React, { useEffect, useState } from "react";
import { fetchPredictions } from "../../utils/api";

const PredictionList = () => {
  const [predictions, setPredictions] = useState([]);
  const [filters, setFilters] = useState({
    platform: "",
    minBudget: "",
    maxBudget: "",
    startDate: "",
    endDate: "",
  });

  const fetchAndSetPredictions = async () => {
    try {
      const data = await fetchPredictions(filters);
      setPredictions(data);
    } catch (error) {
      alert("Failed to fetch predictions. Please try again.");
    }
  };

  useEffect(() => {
    fetchAndSetPredictions();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Predictions</h2>
      <div>
        <label>Filter by Platform:</label>
        <input
          type="text"
          name="platform"
          value={filters.platform}
          onChange={handleFilterChange}
        />
        <label>Min Budget:</label>
        <input
          type="number"
          name="minBudget"
          value={filters.minBudget}
          onChange={handleFilterChange}
        />
        <label>Max Budget:</label>
        <input
          type="number"
          name="maxBudget"
          value={filters.maxBudget}
          onChange={handleFilterChange}
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
        />
      </div>
      <button onClick={fetchAndSetPredictions}>Apply Filters</button>
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction._id}>
            <p><strong>Budget:</strong> {prediction.budget}</p>
            <p><strong>Platforms:</strong> {prediction.platforms.join(", ")}</p>
            <p><strong>Duration:</strong> {prediction.duration} days</p>
            <p><strong>Audience:</strong> {prediction.audience}</p>
            <p><strong>Analytics:</strong> {prediction.analytics}</p>
            <p><strong>Date:</strong> {new Date(prediction.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionList;
