import React, { useState } from "react";
import { ChartBarIcon, UserGroupIcon, EyeIcon, ThumbUpIcon, LightBulbIcon } from "@heroicons/react/outline";

const StrategyBuilder = () => {
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const competitorStats = {
    views: 120000,
    followers: 35000,
    engagementRate: "12%",
  };

  const userStats = {
    views: 100000,
    followers: 28000,
    engagementRate: "10%",
  };

  const generateStrategy = () => {
    setLoading(true);

    // Simulate backend AI processing
    setTimeout(() => {
      setAiSuggestions(
        "Focus on video content to increase engagement. Run a limited-time giveaway campaign to boost follower growth. Leverage Instagram stories to enhance reach."
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Strategy Builder</h1>

        {/* Two Column Layout for Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Competitor Stats */}
          <div className="card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Competitor Statistics</h2>
            <StatCard icon={<EyeIcon className="w-8 h-8 text-blue-500" />} title="Views" value={competitorStats.views} />
            <StatCard icon={<UserGroupIcon className="w-8 h-8 text-green-500" />} title="Followers" value={competitorStats.followers} />
            <StatCard icon={<ChartBarIcon className="w-8 h-8 text-purple-500" />} title="Engagement Rate" value={competitorStats.engagementRate} />
          </div>

          {/* User Stats */}
          <div className="card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Your Statistics</h2>
            <StatCard icon={<EyeIcon className="w-8 h-8 text-blue-500" />} title="Views" value={userStats.views} />
            <StatCard icon={<UserGroupIcon className="w-8 h-8 text-green-500" />} title="Followers" value={userStats.followers} />
            <StatCard icon={<ChartBarIcon className="w-8 h-8 text-purple-500" />} title="Engagement Rate" value={userStats.engagementRate} />
          </div>
        </div>

        {/* AI Suggestions Section */}
        <div className="card bg-white shadow-lg p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">AI-Generated Strategy</h2>
          {loading ? (
            <p className="text-center text-gray-500">Generating strategy...</p>
          ) : aiSuggestions ? (
            <p className="text-gray-800">{aiSuggestions}</p>
          ) : (
            <p className="text-gray-500">Click "Generate Strategy" to get started.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={generateStrategy}
            className="btn btn-primary shadow-md flex items-center space-x-2"
          >
            <LightBulbIcon className="w-5 h-5" />
            <span>Generate Strategy</span>
          </button>
          <button className="btn btn-secondary shadow-md">Save Strategy</button>
          <button className="btn btn-outline shadow-md">Export as PDF</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="mb-4 flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default StrategyBuilder;
