import React from 'react';
import Typography from '@mui/material/Typography';

const Heading = () => {
  return (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: 'bold',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        marginBottom: '1px',
        fontSize: {
          xs: '2rem', // small screens
          sm: '2.5rem', // medium screens
          md: '2.5rem', // large screens
          lg: '3rem', // extra large screens
        },
      }}
    >
      Welcome to Song Directory!
    </Typography>
  );
};

export default Heading;
