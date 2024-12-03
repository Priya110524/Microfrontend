import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Table1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Define columns for DataGrid
  const columns = [
    { field: 'client_name', headerName: 'Client Name', flex: 1, headerClassName: 'bold-header' },
    { field: 'product', headerName: 'Product', flex: 1, headerClassName: 'bold-header' },
    { field: 'pan_number', headerName: 'PAN Number', flex: 1, headerClassName: 'bold-header' },
    { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerClassName: 'bold-header' },
    { field: 'request_for', headerName: 'Request', flex: 1, headerClassName: 'bold-header' },
    { field: 'status', headerName: 'Status', flex: 1, headerClassName: 'bold-header' },
    { field: 'activity', headerName: 'Activity', flex: 1, headerClassName: 'bold-header' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/data/all');
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));
        setData(dataWithIds);
        setFilteredData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = data.filter(item => {
      // Search through all fields of each item
      return (
        item.client_name?.toLowerCase().includes(searchTermLower) ||
        item.product?.toLowerCase().includes(searchTermLower) ||
        item.pan_number?.toLowerCase().includes(searchTermLower) ||
        item.phone_number?.toString().includes(searchTermLower) ||
        item.request_for?.toLowerCase().includes(searchTermLower) ||
        item.status?.toLowerCase().includes(searchTermLower) ||
        item.activity?.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredData(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '98%', height: '100%', mx: 'auto', }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 3,
          fontWeight: 'bold',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        Client Data
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }}>
        <TextField
          label="Search in all columns"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ 
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              }
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
              '&.Mui-focused': {
                color: 'black'
              }
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{
            bgcolor: 'black',
            '&:hover': {
              bgcolor: '#333',
            }
          }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ 
        height: 400, 
        width: '100%',
        '& .bold-header': {
          fontWeight: 'bold',
          color: 'black',
        },
        '& .MuiDataGrid-columnHeader': {
          fontWeight: 'bold',
          color: 'black',
          borderRight: '1px solid black',
          padding: '0',
          '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
          },
          '&.Mui-focused': {
            outline: 'none !important',
            boxShadow: 'none !important',
          },
        },
        '& .MuiDataGrid-columnHeader:last-child': {
          borderRight: 'none',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
          color: 'black',
          fontSize: '18px',
        },
        '& .MuiDataGrid-cell': {
          borderRight: '1px solid black',
          padding: '0',
          '&:focus': {
            outline: 'none !important',
            boxShadow: 'none !important',
          },
        },
        '& .MuiDataGrid-cell:last-child': {
          borderRight: 'none',
        }
      }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          pagination
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          disableColumnMenu
        />
      </Box>
    </Box>
  );
};

export default Table1;
