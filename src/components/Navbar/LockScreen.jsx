import React, { useState } from 'react';
import { Box, Typography, Button, TextField, CssBaseline } from '@mui/material';

const LockScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = '123456';

  const handleUnlock = () => {
    if (password === correctPassword) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          textAlign: 'center',
          p: 3,
          borderRadius: '8px',
          backgroundColor: '#333',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Screen Locked
        </Typography>
        <TextField
          type="password"
          label="Enter Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, backgroundColor: 'white', borderRadius: '4px' }}
          fullWidth
        />
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleUnlock}>
          Unlock Screen
        </Button>
      </Box>
    </Box>
  );
};

export default LockScreen;
