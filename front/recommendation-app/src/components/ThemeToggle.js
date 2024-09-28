import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={{ margin: '20px', padding: '10px' }}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
};

export default ThemeToggle;