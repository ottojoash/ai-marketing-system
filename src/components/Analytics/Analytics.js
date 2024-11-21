import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { ChartBarIcon, UserGroupIcon, EyeIcon, ThumbUpIcon, ShareIcon } from "@heroicons/react/outline";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");

  const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "YouTube"];

  const stats = {
    Instagram: { views: 5000, profileViews: 1200, shares: 300, likes: 1500, comments: 400, newFollowers: 200 },
    Facebook: { views: 4000, profileViews: 1000, shares: 250, likes: 1300, comments: 350, newFollowers: 180 },
    Twitter: { views: 3000, profileViews: 800, shares: 200, likes: 1100, comments: 300, newFollowers: 150 },
    LinkedIn: { views: 2000, profileViews: 500, shares: 100, likes: 800, comments: 200, newFollowers: 100 },
    YouTube: { views: 10000, profileViews: 1500, shares: 500, likes: 2500, comments: 800, newFollowers: 300 },
  };

  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Profile Views",
        data: [1200, 1800, 1500, 2000, 1800, 2200, 2500],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Instagram", "Facebook", "Twitter", "LinkedIn", "YouTube"],
    datasets: [
      {
        label: "Total Views",
        data: [5000, 4000, 3000, 2000, 10000],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Title and Dropdown */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Social Media Analytics</h1>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="select select-bordered w-full max-w-xs shadow-md"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<EyeIcon className="w-8 h-8 text-blue-500" />} title="Views" value={stats[selectedPlatform].views} />
          <StatCard icon={<UserGroupIcon className="w-8 h-8 text-green-500" />} title="Profile Views" value={stats[selectedPlatform].profileViews} />
          <StatCard icon={<ShareIcon className="w-8 h-8 text-purple-500" />} title="Shares" value={stats[selectedPlatform].shares} />
          <StatCard icon={<ThumbUpIcon className="w-8 h-8 text-yellow-500" />} title="Likes" value={stats[selectedPlatform].likes} />
          <StatCard icon={<ChartBarIcon className="w-8 h-8 text-red-500" />} title="Comments" value={stats[selectedPlatform].comments} />
          <StatCard icon={<UserGroupIcon className="w-8 h-8 text-teal-500" />} title="New Followers" value={stats[selectedPlatform].newFollowers} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="card bg-white shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Weekly Profile Views</h2>
            <Line data={chartData} />
          </div>
          <div className="card bg-white shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Views Across Platforms</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="card bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Analytics;
