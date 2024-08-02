import React from 'react';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
        color: theme.palette.text.primary,
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 400,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'dark' ? '0px 4px 20px rgba(255, 255, 255, 0.8)' : '0px 4px 20px rgba(0, 0, 0, 0.7)',
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom align="center" sx={{ mb: 4 }}>
            Profile
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
            ID:  {user.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
           
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              mt: 3,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: 'block',
              margin: '0 auto',
            }}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
