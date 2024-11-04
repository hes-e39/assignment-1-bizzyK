// src/components/PageIndex.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from '../themeToggle/ThemeToggle';

const PageIndex: React.FC = () => (
    <div>
        <ThemeToggle />
        <h1>Assignment</h1>
        <ul>
            <li><Link to="/">Timers</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
        </ul>
        <Outlet />
    </div>
);

export default PageIndex;