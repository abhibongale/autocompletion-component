import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/SongSearch.css'; // Import CSS file for styles
import Suggestions from './Suggestions';
import Heading from './Heading';
import FilterSection from './FilterSection';
import SearchInput from './SearchInput';
import Container from '@mui/material/Container';


// Set default base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:8000';

const SongSearch = () => {
  // State variables for managing query, error, search results, and filters
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    artistName: true,
    albumName: true,
    title: true,
  });

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 15); // Delay in milliseconds

    return () => clearTimeout(delaySearch); // Cleanup clearTimeout on component unmount or re-trigger
  }, [query, filters]);


  // Function to handle changes in filter checkboxes
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // Function to handle search based on selected filters
  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {}

      // Add parameters based on active filters
      if (filters.artistName) params.authorName = query
      if (filters.albumName) params.albumName = query
      if (filters.title) params.title = query

      // Make GET request to API endpoint
      const response = await axios.get('/api/search', {params});
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching songs:', error);
      setSearchResults([]); // Clear previous results on error
      setError('An error occurred while searching songs.');
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle expanded details for a specific search result
  const toggleDetails = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].expanded = !updatedResults[index].expanded;
    setSearchResults(updatedResults);
  };

  // JSX structure for rendering the SongSearch component
  return (
    <Container maxWidth={false} disableGutters>
      <Heading/>
      <SearchInput query={query} setQuery={setQuery}/>
      <FilterSection filters = {filters} handleFilterChange = {handleFilterChange} />
      {error && <p className="error-message">{error}</p>}
      <Suggestions searchResults={searchResults} loading={loading} toggleDetails={toggleDetails}/>
    </Container>
  );
};

export default SongSearch;
