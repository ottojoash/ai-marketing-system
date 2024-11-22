import React from "react";

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <div>
          {/* Example Filter (Date Picker or Dropdowns) */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Filter by Date
          </button>
        </div>
      </header>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">New Likes</h2>
          <p className="text-gray-600 mt-2">Total: <span className="font-bold text-blue-600">150</span></p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">New Comments</h2>
          <p className="text-gray-600 mt-2">Total: <span className="font-bold text-blue-600">95</span></p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">Customer Feedback</h2>
          <p className="text-gray-600 mt-2">Total: <span className="font-bold text-blue-600">12</span></p>
        </div>
      </section>

      {/* Detailed Reports */}
      <section className="space-y-6">
        {/* Likes Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">New Likes</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Post: "How to grow your business"</span>
              <span className="font-bold text-blue-600">+45</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Post: "Latest marketing trends"</span>
              <span className="font-bold text-blue-600">+30</span>
            </li>
          </ul>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">New Comments</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Post: "How to grow your business"</span>
              <span className="font-bold text-blue-600">+25</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Post: "Tips for effective social media"</span>
              <span className="font-bold text-blue-600">+15</span>
            </li>
          </ul>
        </div>

        {/* Customer Feedback */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
          <ul className="space-y-2">
            <li className="border-b pb-2">
              <p className="text-gray-800 font-medium">"Great service, keep it up!"</p>
              <p className="text-gray-600 text-sm">From: John Doe</p>
            </li>
            <li className="border-b pb-2">
              <p className="text-gray-800 font-medium">"I had an issue with the app."</p>
              <p className="text-gray-600 text-sm">From: Jane Smith</p>
            </li>
          </ul>
        </div>

        {/* Inbox Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Inboxes</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Message from: <strong>John Doe</strong></span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Message from: <strong>Jane Smith</strong></span>
              <span className="text-sm text-gray-600">1 day ago</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Reports;
