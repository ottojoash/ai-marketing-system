import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Shared/Layout"; // Import Layout
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import CompetitorAnalytics from "./components/CompetitorAnalysis/CompetitorAnalysis";
import StrategyBuilder from "./components/StrategyBuilder/StrategyBuilder";
import Settings from "./pages/Settings";
import Reports from "./components/Reports/Reports";

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes with Layout */}
      <Route
        path="/dashboard/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports/>}/>
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/competitor-analytics" element={<CompetitorAnalytics />} />
              <Route path="/strategy-builder" element={<StrategyBuilder />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
