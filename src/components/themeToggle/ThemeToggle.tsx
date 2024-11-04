// ThemeToggle.tsx
import { useState, useEffect } from 'react';
import '../../index.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="theme-toggle-container" title="Switch mode">
            <span>{theme === 'light' ? 'Light' : 'Dark'} Mode</span>
            <label className="switch">
                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default ThemeToggle;