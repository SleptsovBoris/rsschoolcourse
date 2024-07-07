import React from 'react';
import './SearchResults.css';
import { SearchResult } from '../../types';

interface SearchResultsProps {
  results: SearchResult[];
}

class SearchResults extends React.Component<SearchResultsProps> {
  render() {
    const { results } = this.props;
    return (
      <div className="results">
        <h2>Search Results:</h2>
        <div className="resultsContainer">
          {results.map((result) => (
            <div className="resultCard" key={result.id}>
              <img className="resultCardImg" src={result.image} alt="" />
              <div className="resultCardTitle">{result.name}</div>
              <div>
                Status: {result.status}
                <div>Gender: {result.gender}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResults;
