import React, { useState, useEffect } from "react";
import {
  fetchStrategies,
  createStrategy,
  generateStrategySuggestions,
  fetchTemplates,
} from "../utils/api";
import { LightBulbIcon } from "@heroicons/react/outline";

const StrategyBuilder = () => {
  const [strategies, setStrategies] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [newStrategy, setNewStrategy] = useState({ name: "", description: "", steps: [] });

  // Fetch all strategies and templates on load
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedStrategies = await fetchStrategies();
        const fetchedTemplates = await fetchTemplates();
        setStrategies(fetchedStrategies);
        setTemplates(fetchedTemplates.templates);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadData();
  }, []);

  // Generate AI-based strategy suggestions
  const handleGenerateSuggestions = async () => {
    if (!goal || !audience || !budget) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await generateStrategySuggestions(goal, audience, budget);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save a new strategy
  const handleSaveStrategy = async () => {
    if (!newStrategy.name || !newStrategy.description || newStrategy.steps.length === 0) {
      alert("Please fill in all fields for the strategy.");
      return;
    }

    try {
      const savedStrategy = await createStrategy(newStrategy);
      setStrategies([...strategies, savedStrategy]);
      alert("Strategy saved successfully!");
      setNewStrategy({ name: "", description: "", steps: [] }); // Reset form
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Strategy Builder</h1>

        {/* Strategy Suggestions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Generate Strategy Suggestions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Goal (e.g., Increase engagement)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Target Audience (e.g., Teens, Tech-savvy)"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Budget (e.g., 1000)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button
            onClick={handleGenerateSuggestions}
            className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`}
          >
            Generate Suggestions
          </button>
          <ul className="mt-6 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded shadow">
                {suggestion}
              </li>
            ))}
          </ul>
        </section>

        {/* Strategy Templates */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Predefined Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="card bg-white p-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">{template.name}</h3>
                <p className="text-gray-600 mt-2">{template.description}</p>
                <ul className="mt-4 list-disc list-inside">
                  {template.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Create a New Strategy */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a New Strategy</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Strategy Name"
              value={newStrategy.name}
              onChange={(e) =>
                setNewStrategy({ ...newStrategy, name: e.target.value })
              }
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Description"
              value={newStrategy.description}
              onChange={(e) =>
                setNewStrategy({ ...newStrategy, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
            />
            <textarea
              placeholder="Steps (one per line)"
              value={newStrategy.steps.join("\n")}
              onChange={(e) =>
                setNewStrategy({
                  ...newStrategy,
                  steps: e.target.value.split("\n"),
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>
          <button
            onClick={handleSaveStrategy}
            className="btn btn-primary mt-4"
          >
            Save Strategy
          </button>
        </section>
      </div>
    </div>
  );
};

export default StrategyBuilder;
