import React from 'react';
import styles from './ThemeSwitcher.module.css';
import useTheme from '../../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.toggler}>
      <input
        type="checkbox"
        className={styles.togglerInput}
        onChange={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />
      <span className={styles.togglerSlider}></span>
    </label>
  );
};

export default ThemeSwitcher;
