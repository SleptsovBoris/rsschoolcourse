import React, { useEffect } from 'react';
import useSearchTerm from '../../hooks/useSearchTerm';
import Search from '../../components/Search/Search';
import MortyIcon from '../../assets/morty-svgrepo-com.svg';
import Loader from '../../components/Loader/Loader';
import SearchResults from '../../components/SearchResults/SearchResults';
import './Main.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import useQuery from '../../hooks/useQuery';
import { characterAPI } from '../../services/CharacterService';
import FlyoutBar from '../../components/FlyoutBar/FlyoutBar';
import ThemeSwitcher from '../../components/ThemeProvider/ThemeSwitcher';
import useTheme from '../../hooks/useTheme';
import { setCharacters } from '../../store/reducers/CharactersSlice';
import { useDispatch } from 'react-redux';

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);
  const detailsId = query.get('details');
  const { data, error, isLoading } = characterAPI.useSearchCharactersQuery({
    name: searchTerm,
    page: currentPage,
  });

  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        setCharacters({
          characters: data.results,
          currentPage,
          totalPages: data.info.pages,
        }),
      );
    }
  }, [data, currentPage, dispatch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/?page=1`);
  };

  return (
    <div className={`container ${theme}`}>
      <div className="searchArea">
        <img className="logo" src={MortyIcon} alt="" />
        <Search onSearch={handleSearch} />
        <ThemeSwitcher />
      </div>
      <div className="contentArea">
        <div className="resultsArea">
          {isLoading && <Loader />}
          {error && (
            <p className="errorMessage">Произошла ошибка при загрузке</p>
          )}
          {!error && !isLoading && data && (
            <>
              {data.results.length > 0 && <Pagination />}
              <SearchResults />
              <FlyoutBar />
            </>
          )}
        </div>
        {detailsId ? (
          <div className="detailsArea">
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
