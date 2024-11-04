import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from '../themeToggle/ThemeToggle';

const PageIndex: React.FC = () => (
    <div className="app-container">
        <div className="theme-toggle-container">
            <ThemeToggle />
        </div>
        <h1>Assignment 1 - Elizabeth Koch</h1>
        <ul>
            <li><Link to="/">Timers</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
        </ul>
        <Outlet />
    </div>
);

export default PageIndex;