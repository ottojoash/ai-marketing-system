/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { FaChartLine, FaFileAlt, FaUsers, FaLightbulb, FaCog, FaHome } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard Overview</h1>
          {/* <p className="text-gray-500 mt-2">A quick overview of your system's analytics and activity</p> */}
        </header>

        {/* Grid of Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaHome className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
              <p className="text-gray-500">General system stats</p>
            </div>
          </div> */}

          {/* Reports Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaFileAlt className="text-4xl text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Reports</h2>
              <p className="text-gray-500">View detailed reports</p>
            </div>
          </div> */}

          {/* Analytics Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaChartLine className="text-4xl text-purple-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Analytics</h2>
              <p className="text-gray-500">Analyze system performance</p>
            </div>
          </div> */}

          {/* Competitor Analytics Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaUsers className="text-4xl text-pink-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Competitor Analytics</h2>
              <p className="text-gray-500">Track competitors' performance</p>
            </div>
          </div> */}

          {/* Strategy Builder Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaLightbulb className="text-4xl text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Strategy Builder</h2>
              <p className="text-gray-500">Build winning strategies</p>
            </div>
          </div> */}

          {/* Settings Card */}
          {/* <div className="card bg-white p-4 shadow-md flex items-center space-x-4">
            <FaCog className="text-4xl text-gray-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Settings</h2>
              <p className="text-gray-500">Manage system preferences</p>
            </div>
          </div> */}
        </section>

        {/* Analytics Overview */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Quick Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">Total Sales</h2>
              <p className="text-2xl font-bold text-green-500">$45,000</p>
            </div>
            <div className="card bg-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">New Users</h2>
              <p className="text-2xl font-bold text-blue-500">1,200</p>
            </div>
            <div className="card bg-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">Monthly Revenue</h2>
              <p className="text-2xl font-bold text-purple-500">$12,500</p>
            </div>
          </div>
        </section>

        {/* Trending Topics Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Trending Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Topic 1 */}
            <div className="card bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">AI in Business</h3>
              <p className="text-gray-500 mt-2">
                Learn how Artificial Intelligence is revolutionizing industries globally.
              </p>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline font-semibold"
              >
                Read More
              </a>
            </div>

            {/* Topic 2 */}
            <div className="card bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Remote Work Trends</h3>
              <p className="text-gray-500 mt-2">
                Discover the latest trends and tools for productive remote work.
              </p>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline font-semibold"
              >
                Read More
              </a>
            </div>

            {/* Topic 3 */}
            <div className="card bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Cybersecurity Updates</h3>
              <p className="text-gray-500 mt-2">
                Stay updated on the newest threats and protection strategies.
              </p>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline font-semibold"
              >
                Read More
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
