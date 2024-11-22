import React, { useState } from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  EyeIcon,
  ThumbUpIcon,
  FireIcon,
} from "@heroicons/react/outline";

const CompetitorAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [competitorData, setCompetitorData] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);

  const sampleCompetitorStats = {
    views: 120000,
    followers: 35000,
    engagementRate: "12%",
    trendingPosts: [
      {
        title: "Black Friday Deals!",
        engagement: 1500,
        reach: "45K",
      },
      {
        title: "Holiday Season Specials",
        engagement: 1200,
        reach: "30K",
      },
      {
        title: "New Product Launch!",
        engagement: 1000,
        reach: "25K",
      },
    ],
  };

  const handleSearch = () => {
    // Simulate API call
    if (searchQuery) {
      setCompetitorData(sampleCompetitorStats);
      setTrendingPosts(sampleCompetitorStats.trendingPosts);
    } else {
      setCompetitorData(null);
      setTrendingPosts([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Competitor Analytics</h1>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search for a competitor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full max-w-sm shadow-md"
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Competitor Stats */}
        {competitorData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <StatCard
                icon={<EyeIcon className="w-8 h-8 text-blue-500" />}
                title="Total Views"
                value={competitorData.views}
              />
              <StatCard
                icon={<UserGroupIcon className="w-8 h-8 text-green-500" />}
                title="Followers"
                value={competitorData.followers}
              />
              <StatCard
                icon={<ChartBarIcon className="w-8 h-8 text-purple-500" />}
                title="Engagement Rate"
                value={competitorData.engagementRate}
              />
            </div>

            {/* Trending Posts */}
            <div className="card bg-white shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-600 mb-4">
                Trending Posts
              </h2>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <TrendingPostCard key={index} post={post} />
                ))}
              </div>
            </div>
          </>
        )}
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

const TrendingPostCard = ({ post }) => (
  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{post.title}</h3>
      <p className="text-sm text-gray-500">
        Engagement: {post.engagement} • Reach: {post.reach}
      </p>
    </div>
    <FireIcon className="w-6 h-6 text-red-500" />
  </div>
);

export default CompetitorAnalytics;
