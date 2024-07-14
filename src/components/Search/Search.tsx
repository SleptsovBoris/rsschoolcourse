import React from 'react';
import './Search.css';
import useSearchTerm from '../Hooks/useSearchTerm';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
