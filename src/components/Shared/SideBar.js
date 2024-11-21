import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartLine, FaCog, FaFileAlt, FaUsers, FaTools, FaChartPie } from "react-icons/fa";

const Sidebar = () => (
  <aside className="w-64 bg-gray-800 text-white shadow-lg hidden md:block">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaHome className="text-xl" />
              <span>Overview</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaFileAlt className="text-xl" />
              <span>Reports</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaChartLine className="text-xl" />
              <span>Analytics</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/competitor-analytics"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaUsers className="text-xl" />
              <span>Competitor Analytics</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/strategy-builder"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaTools className="text-xl" />
              <span>Strategy Builder</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 text-blue-400 font-semibold"
                  : "flex items-center space-x-4 hover:text-blue-300"
              }
            >
              <FaCog className="text-xl" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
