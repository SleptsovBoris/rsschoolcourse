import React, { useState } from 'react';
import './Search.css';
import useSearchTerm from '../../hooks/useSearchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [tempSearchTerm, setTempSearchTerm] = useState<string>(searchTerm);

  const handleSearch = () => {
    const trimmedTerm = tempSearchTerm.trim();
    setSearchTerm(trimmedTerm);
    onSearch(trimmedTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(event.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        value={tempSearchTerm}
        onChange={handleChange}
      />
      <button className="searchButton" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
