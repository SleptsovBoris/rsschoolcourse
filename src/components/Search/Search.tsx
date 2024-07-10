import React, { Component } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchTerm: '' };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
      this.setState({ searchTerm: savedTerm });
    }
  }

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="search">
        <input
          className="searchInput"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
