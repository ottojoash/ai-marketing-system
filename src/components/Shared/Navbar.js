import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>AI Marketing System</h1>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/strategy">Strategy Builder</Link></li>
      <li><Link to="/analytics">Analytics</Link></li>
      <li><Link to="/competitor">Competitor Analysis</Link></li>
    </ul>
  </nav>
);

export default Navbar;
