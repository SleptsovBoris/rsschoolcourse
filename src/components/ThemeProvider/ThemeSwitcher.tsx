import React from 'react';
import './ThemeSwitcher.css';
import useTheme from '../../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="toggler">
      <input
        type="checkbox"
        className="togglerInput"
        onChange={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />
      <span className="togglerSlider"></span>
    </label>
  );
};

export default ThemeSwitcher;
