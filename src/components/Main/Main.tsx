import React, { useEffect } from 'react';
import useSearchTerm from '../../hooks/useSearchTerm';
import SearchResults from '../SearchResults/SearchResults';
import styles from './Main.module.css';
import Pagination from '../Pagination/Pagination';
import { characterAPI } from '../../services/CharacterService';
import FlyoutBar from '../FlyoutBar/FlyoutBar';
import ThemeSwitcher from '../ThemeProvider/ThemeSwitcher';
import useTheme from '../../hooks/useTheme';
import { setCharacters } from '../../store/reducers/CharactersSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Search from '../Search/Search';

const MainPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const { query } = useRouter();
  const currentPage = parseInt((query.page as string) || '1', 10);
  const detailsId = query.details as string;

  const { data } = characterAPI.useSearchCharactersQuery({
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

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.searchArea}>
        <img
          className={styles.logo}
          src="/images/morty-icon.svg"
          alt="morty-icon"
        />
        <Search onSearch={setSearchTerm} />
        <ThemeSwitcher />
      </div>
      <div className={styles.contentArea}>
        <div className={styles.resultsArea}>
          <Pagination />
          <SearchResults />
          <FlyoutBar />
        </div>
        {detailsId ? (
          <div className={styles.detailsArea}>{children}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainPage;
