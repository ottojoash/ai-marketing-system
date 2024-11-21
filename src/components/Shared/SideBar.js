import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaCog,
  FaFileAlt,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

const Sidebar = () => (
  <aside className="w-64 bg-gray-50 border-r border-gray-200 hidden md:block">
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaHome className="text-lg" />
              <span>Overview</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaFileAlt className="text-lg" />
              <span>Reports</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaChartLine className="text-lg" />
              <span>Analytics</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/dashboard/competitor-analytics"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaUsers className="text-lg" />
              <span>Competitor Analytics</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/dashboard/strategy-builder"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaLightbulb className="text-lg" />
              <span>Strategy Builder</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
                  : "flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
              }
            >
              <FaCog className="text-lg" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
