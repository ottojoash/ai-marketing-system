import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Shared/SideBar";
import Dashboard from "./components/Dashboard/Dashboard";
// import Overview from "./components/Pages/Overview";
// import Reports from "./components/Pages/Reports";
import Analytics from "./components/Analytics/Analytics";
import CompetitorAnalytics from "./components/CompetitorAnalysis/CompetitorAnalysis";
import StrategyBuilder from "./components/StrategyBuilder/StrategyBuilder";
import Settings from "./pages/Settings";

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard Layout */}
      <Route
        path="/dashboard/*"
        element={
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/overview" element={<Overview />} /> */}
                {/* <Route path="/reports" element={<Reports />} /> */}
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/competitor-analytics" element={<CompetitorAnalytics />} />
                <Route path="/strategy-builder" element={<StrategyBuilder />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  </Router>
);

export default App;
