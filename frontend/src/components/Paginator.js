import React from 'react';

const Paginator = ({ onPageChange, onPageSizeChange, totalRecords }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
    onPageSizeChange(newSize);
    onPageChange(1);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          ⬅ Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Pagina {currentPage} din {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next ➡
        </button>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        Elemente pe pagină:
        <select value={pageSize} onChange={handlePageSizeChange} style={{ marginLeft: '0.5rem' }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Paginator;
