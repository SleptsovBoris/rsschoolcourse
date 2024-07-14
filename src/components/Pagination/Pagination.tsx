import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`/?page=${currentPage - 1}`} className="arrow-link">
          {'<'}
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link to={`/?page=1`} className="link">
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
          onClick={() => onPageChange(page)} // Добавлен вызов onPageChange
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="dots">...</span>}
          <Link to={`/?page=${totalPages}`} className="link">
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link to={`/?page=${currentPage + 1}`} className="arrow-link">
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
