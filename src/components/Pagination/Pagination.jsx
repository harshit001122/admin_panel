import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      className='bg-primary'>
        Previous
      </button>
      <span className='page'>Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      className='bg-primary'>
        Next
      </button>
    </div>
  );
};

export default Pagination;
