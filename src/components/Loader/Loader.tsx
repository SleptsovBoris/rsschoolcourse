import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div
      data-testid="Loader"
      className={styles.loaderWrapper}
      suppressHydrationWarning={true}
    >
      <img
        src="/images/loading-icon.svg"
        className={styles.loaderImg}
        alt="Loading..."
      />
    </div>
  );
};

export default Loader;
