import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

function App() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSearch = () => {
    alert(`Searching for hotels from ${checkInDate} to ${checkOutDate}`);
    // Here you would typically handle the search logic,
    // possibly making an API call to your backend service.
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Hotel Finder
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Check-in Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Check-out Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search Hotels
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
