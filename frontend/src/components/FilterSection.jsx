import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const FilterSection = ({ filters, handleFilterChange }) => {
  return (
    <FormGroup row sx={{ justifyContent: 'center' }}>
      <FormControlLabel
        control={<Checkbox checked={filters.artistName} onChange={handleFilterChange} name="artistName" />}
        label="Artist Name"
      />
      <FormControlLabel
        control={<Checkbox checked={filters.albumName} onChange={handleFilterChange} name="albumName" />}
        label="Album Name"
      />
      <FormControlLabel
        control={<Checkbox checked={filters.title} onChange={handleFilterChange} name="title" />}
        label="Song Name"
      />
    </FormGroup>
  );
};

export default FilterSection;
