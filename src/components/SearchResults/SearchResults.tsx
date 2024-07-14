import React from 'react';
import './SearchResults.css';
import { SearchResult } from '../../types';

interface SearchResultsProps {
  results: SearchResult[];
  onItemClick: (id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onItemClick,
}) => {
  return (
    <div className="results">
      <div className="resultsTitle">Search Results:</div>
      {results.length === 0 ? (
        <div className="noResultsMessage">No results found</div>
      ) : (
        <div className="resultsContainer">
          {results.map((result) => (
            <div
              className="resultCard"
              key={result.id}
              onClick={() => onItemClick(result.id)}
            >
              <img className="resultCardImg" src={result.image} alt="" />
              <div className="resultCardTitle" data-testid="resultCardTitle">
                {result.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
