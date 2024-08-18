import { Link } from 'react-router-dom';
import styles from './Main.module.css';
import { useAppSelector } from './redux/store';

const Main = () => {
  const customFormData = useAppSelector((state) => state.data.customFormData);
  const hookFormData = useAppSelector((state) => state.data.hookFormData);

  const reversedCustomFormData = customFormData.slice().reverse();
  const reversedHookFormData = hookFormData.slice().reverse();

  return (
    <div className={styles.mainContainer}>
      <h1>Main Page</h1>
      <div className={styles.navigation}>
        <Link to="/custom_form">Custom Form</Link>
        <Link to="/hook_form">React-hook Form</Link>
      </div>
      <div className={styles.forms}>
        <div className={styles.section}>
          <h2>Custom Form Data</h2>
          <div className={styles.tilesContainer}>
            {reversedCustomFormData.map((data, index) => (
              <div
                key={index}
                className={`${styles.tile} ${index === 0 ? styles.newTile : ''}`}
              >
                <p>
                  <strong>Name:</strong> {data.name}
                </p>
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Gender:</strong> {data.gender}
                </p>
                <p>
                  <strong>Country:</strong> {data.country}
                </p>
                <img src={data.image as string} alt="uploaded" width="100px" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <h2>React-hook Form Data</h2>
          <div className={styles.tilesContainer}>
            {reversedHookFormData.map((data, index) => (
              <div
                key={index}
                className={`${styles.tile} ${index === 0 ? styles.newTile : ''}`}
              >
                <p>
                  <strong>Name:</strong> {data.name}
                </p>
                <p>
                  <strong>Age:</strong> {data.age}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong>Gender:</strong> {data.gender}
                </p>
                <p>
                  <strong>Country:</strong> {data.country}
                </p>
                <img src={data.image as string} alt="uploaded" width="100px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
