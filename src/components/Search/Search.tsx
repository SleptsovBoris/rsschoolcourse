import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import useSearchTerm from '../../hooks/useSearchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [tempSearchTerm, setTempSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    setTempSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    const trimmedTerm = tempSearchTerm.trim();
    setSearchTerm(trimmedTerm);
    onSearch(trimmedTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search ..."
        value={tempSearchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
