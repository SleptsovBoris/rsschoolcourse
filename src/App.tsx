import { Component } from 'react';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import MortyIcon from './assets/morty-svgrepo-com.svg';
import './App.css';
import { SearchResult } from './types';
import Loader from './components/Loader/Loader';

interface AppState {
  results: SearchResult[];
  error: string | null;
  loading: boolean;
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      results: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm');
    this.fetchResults(savedTerm || '');
  }

  fetchResults = async (searchTerm: string) => {
    this.setState({ loading: true });
    try {
      searchTerm = searchTerm.trim();
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}`,
      );
      const data: { results: SearchResult[] } = await response.json();
      this.setState({ results: data.results, error: null, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch results', loading: false });
      console.error('Fetch error:', error);
    }
  };

  handleSearch = (term: string) => {
    this.fetchResults(term);
  };

  throwError = () => {
    this.fetchResults('Morti');
  };

  render() {
    const { results, error, loading } = this.state;

    return (
      <ErrorBoundary>
        <div className="container">
          <div className="searchArea">
            <img className="logo" src={MortyIcon} alt="" />
            <Search onSearch={this.handleSearch} />
            <button onClick={this.throwError}>Throw Error</button>
          </div>
          <div className="resultsArea">
            {loading ? (
              <Loader />
            ) : error ? (
              <p className="errorMessage">{error}</p>
            ) : (
              <SearchResults results={results} />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
