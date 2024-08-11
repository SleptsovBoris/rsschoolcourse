import React from 'react';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../../store/reducers/CharactersSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.characters,
  );

  const MAX_PAGES = 5;
  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);

  if (endPage - startPage + 1 < MAX_PAGES) {
    startPage = Math.max(1, endPage - MAX_PAGES + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    dispatch(setCharacters({ characters: [], currentPage: page, totalPages }));
    router.push(`/?page=${page}&name=${router.query.name}`);
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={`/?page=${currentPage - 1}&name=${router.query.name}`}
          className={styles.arrowlink}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {'<'}
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={`/?page=1&name=${router.query.name}`}
            className={styles.link}
            onClick={() => handlePageChange(1)}
          >
            1
          </Link>
          {startPage > 2 && <span className={styles.dots}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`/?page=${page}&name=${router.query.name}`}
          className={page === currentPage ? styles.activeLink : styles.link}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.dots}>...</span>}
          <Link
            href={`/?page=${totalPages}&name=${router.query.name}`}
            className={styles.link}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}&name=${router.query.name}`}
          className={styles.arrowlink}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
