import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';

// Displays Suggestions in a Table Format
const Suggestions = ({ searchResults, toggleDetails }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Artist Name</TableCell>
            <TableCell>Album Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((song, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.length}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleDetails(index)}
                  >
                    {song.expanded ? 'Hide Details' : 'Show Details'}
                  </Button>
                </TableCell>
              </TableRow>
              {song.expanded && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="details">
                      <p><strong>Description:</strong> {song.description}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Suggestions;
