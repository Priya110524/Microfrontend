import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Table.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Available page size options
  const pageSizeOptions = [10, 25, 50, 75, 100];

  // Add new state for column-specific searches
  const [columnSearches, setColumnSearches] = useState({
    client_name: '',
    product: '',
    pan_number: '',
    phone_number: '',
    request_for: '',
    status: '',
    activity: ''
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Create column configs for search/sort
      const columnConfigs = [];
      
      // Add search configuration for each column if there's a search term
      Object.entries(columnSearches).forEach(([column, searchStr]) => {
        if (searchStr) {
          columnConfigs.push({
            column,
            search_str: searchStr,
            sort: column === sortColumn ? sortDirection : null
          });
        }
      });

      // Add sort configuration if sorting is active and no search for that column
      if (sortColumn && sortDirection && !columnSearches[sortColumn]) {
        columnConfigs.push({
          column: sortColumn,
          search_str: null,
          sort: sortDirection
        });
      }

      const response = await axios.get('http://localhost:3005/data', {
        params: {
          page_number: currentPage,
          page_size: pageSize,
          column_configs: JSON.stringify(columnConfigs)
        }
      });

      console.log('Response data:', response.data.data);

      console.log('Response data item example:', response.data.data[0]);

      setData(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, columnSearches, sortColumn, sortDirection]);

  // Fetch data when page changes
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, columnSearches, sortColumn, sortDirection, fetchData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  // Add this new function to generate page numbers
  const getPageNumbers = () => {
    const maxButtons = 5; // Show max 5 page numbers at a time
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    
    // Adjust start if we're near the end
    if (totalPages - start < maxButtons - 1) {
      start = Math.max(1, totalPages - maxButtons + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Handle entries per page change
  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Add new function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if clicking same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Add this helper function to get sort indicator
  const getSortIndicator = (columnName) => {
    if (sortColumn === columnName) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '↕'; // Default both arrows when not sorted
  };

  // Handle column search change
  const handleColumnSearch = (column, value) => {
    setColumnSearches(prev => ({
      ...prev,
      [column]: value
    }));
  };

  return (
    <div>
      <h1 className="heading">Server Data</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('client_name')}>
                Client Name <span className={`sort-indicator ${sortColumn === 'client_name' ? 'active' : ''}`}>{getSortIndicator('client_name')}</span>
                <input
                  type="text"
                  placeholder="Search client..."
                  value={columnSearches.client_name}
                  onChange={(e) => handleColumnSearch('client_name', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('product')}>
                Product <span className={`sort-indicator ${sortColumn === 'product' ? 'active' : ''}`}>{getSortIndicator('product')}</span>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={columnSearches.product}
                  onChange={(e) => handleColumnSearch('product', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('pan_number')}>
                PAN Number <span className={`sort-indicator ${sortColumn === 'pan_number' ? 'active' : ''}`}>{getSortIndicator('pan_number')}</span>
                <input
                  type="text"
                  placeholder="Search PAN..."
                  value={columnSearches.pan_number}
                  onChange={(e) => handleColumnSearch('pan_number', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('phone_number')}>
                Phone Number <span className={`sort-indicator ${sortColumn === 'phone_number' ? 'active' : ''}`}>{getSortIndicator('phone_number')}</span>
                <input
                  type="text"
                  placeholder="Search phone..."
                  value={columnSearches.phone_number}
                  onChange={(e) => handleColumnSearch('phone_number', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('request_for')}>
                Request <span className={`sort-indicator ${sortColumn === 'request_for' ? 'active' : ''}`}>{getSortIndicator('request_for')}</span>
                <input
                  type="text"
                  placeholder="Search request..."
                  value={columnSearches.request_for}
                  onChange={(e) => handleColumnSearch('request_for', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('status')}>
                Status <span className={`sort-indicator ${sortColumn === 'status' ? 'active' : ''}`}>{getSortIndicator('status')}</span>
                <input
                  type="text"
                  placeholder="Search status..."
                  value={columnSearches.status}
                  onChange={(e) => handleColumnSearch('status', e.target.value)}
                  className="column-search-input"
                />
              </th>
              <th onClick={() => handleSort('activity')}>
                Activity <span className={`sort-indicator ${sortColumn === 'activity' ? 'active' : ''}`}>{getSortIndicator('activity')}</span>
                <input
                  type="text"
                  placeholder="Search activity..."
                  value={columnSearches.activity}
                  onChange={(e) => handleColumnSearch('activity', e.target.value)}
                  className="column-search-input"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">Loading...</td>
              </tr>
            ) : data.length > 0 ? (
              data.map(item => (
                <tr key={item.pan_number}>
                  <td>{item.client_name}</td>
                  <td>{item.product}</td>
                  <td>{item.pan_number}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.request_for}</td>
                  <td>{item.status}</td>
                  <td>{item.activity || 'No activity'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No client found with name: {searchTerm}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || loading}
          className="pagination-button"
        >
        Prev
        </button>

        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            disabled={loading}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || loading}
          className="pagination-button"
        >
          Next
        </button>

        <div className="entries-per-page">
          <span>Show</span>
          <select 
            value={pageSize} 
            onChange={handlePageSizeChange}
            className="page-size-select"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>Entries</span>
        </div>
      </div>
    </div>
  );
};

export default Table;
