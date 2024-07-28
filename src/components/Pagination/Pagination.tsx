import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pagination.css';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../../store/reducers/CharactersSlice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate(`/?page=${page}`);
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          to={`/?page=${currentPage - 1}`}
          className="arrow-link"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {'<'}
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            to={`/?page=1`}
            className="link"
            onClick={() => handlePageChange(1)}
          >
            1
          </Link>
          {startPage > 2 && <span className="dots">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          to={`/?page=${page}`}
          className={page === currentPage ? 'activeLink' : 'link'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="dots">...</span>}
          <Link
            to={`/?page=${totalPages}`}
            className="link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          to={`/?page=${currentPage + 1}`}
          className="arrow-link"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
