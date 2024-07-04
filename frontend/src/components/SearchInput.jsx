import React from 'react';
import TextField from '@mui/material/TextField';

const SearchInputBox = ({ query, setQuery }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ marginBottom: '20px' }}
    />
  );
};

export default SearchInputBox;