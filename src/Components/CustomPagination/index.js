
import React from 'react';
import './style.css';

const CustomPagination = ({ itemsPerPage, totalItems, currentPage, onPageChange, maxPagesToShow = 7 }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  };

  generatePageNumbers();

  return (
    <div className="paginationBar align-items-center">
      <p>Showing {itemsPerPage} out of {totalItems} Entries</p>
      <ul>
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
            <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
        <li>
          <button onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;