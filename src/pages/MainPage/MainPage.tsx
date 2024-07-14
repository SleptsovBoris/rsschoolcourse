import React, { useEffect, useState } from 'react';
import { SearchResult, ApiResponse } from '../../types';
import useSearchTerm from '../../components/Hooks/useSearchTerm';
import Search from '../../components/Search/Search';
import MortyIcon from '../../assets/morty-svgrepo-com.svg';
import Loader from '../../components/Loader/Loader';
import SearchResults from '../../components/SearchResults/SearchResults';
import './Main.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MainPage: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [totalPages, setTotalPages] = useState<number>(1);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);
  const detailsId = query.get('details');

  useEffect(() => {
    fetchResults(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const fetchResults = async (searchTerm: string, page: number) => {
    setLoading(true);
    try {
      searchTerm = searchTerm.trim();
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`,
      );
      const data: ApiResponse = await response.json();
      setResults(data.results);
      setTotalPages(data.info.pages);
      setError(null);
    } catch (error) {
      setError('Failed to fetch results');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/?page=1`);
    fetchResults(term, 1);
  };

  const handleItemClick = (id: number) => {
    navigate(`/details/${id}?page=${currentPage}&details=${id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    navigate(`/?page=${pageNumber}`);
  };

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`);
  };

  return (
    <div className="container">
      <div className="searchArea">
        <img className="logo" src={MortyIcon} alt="" />
        <Search onSearch={handleSearch} />
      </div>
      <div className="contentArea">
        <div
          className="resultsArea"
          onClick={detailsId ? handleCloseDetails : () => {}}
        >
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="errorMessage">{error}</p>
          ) : (
            <>
              <SearchResults results={results} onItemClick={handleItemClick} />
              {results.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
        {detailsId ? (
          <div className="detailsArea">
            <button className="closeDetails" onClick={handleCloseDetails}>
              Close Details
            </button>
            <Outlet />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainPage;
