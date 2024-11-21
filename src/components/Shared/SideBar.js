import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Overview
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Reports
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Analytics
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/competitor-analytics"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Competitor Analytics
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/strategy-builder"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Strategy Builder
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold underline"
                    : "text-blue-500 hover:underline"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
