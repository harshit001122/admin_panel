import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
  CssBaseline,
  Divider,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import LockScreen from './LockScreen';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const user = {
    id: '123456',
    email: 'user@example.com',
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogOut = () => {
    navigate("/");
  };

  const handleLockScreen = () => {
    setIsLocked(true);
  };

  const handleUnlockScreen = () => {
    setIsLocked(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const themeMode = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffffff' : '#000000',
      },
    },
    typography: {
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  });

  useEffect(() => {
    const projectsTable = document.querySelector('.projects-table');
    if (projectsTable) {
      projectsTable.style.backgroundColor = darkMode ? '#ffffff' : '#000000';
    }
  }, [darkMode]);
  useEffect(() => {
    const projectsTable = document.querySelector('.projects-table');
    if (projectsTable) {
      projectsTable.style.color = darkMode ? '#ffffff' : '#000000';
    }
  }, [darkMode]);

  useEffect(() => {
    const projectsTableText = document.querySelectorAll('.projects-table td p:last-of-type');
    projectsTableText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);

  useEffect(() => {
    const projectsTableCategoryText = document.querySelectorAll('.newDashboard ');
    projectsTableCategoryText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);

  useEffect(() => {
    const projectsTableCategoryText = document.querySelectorAll('.name ');
    projectsTableCategoryText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);


  useEffect(() => {
    const projectsTableCategoryText = document.querySelectorAll('.budget ');
    projectsTableCategoryText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);

  useEffect(() => {
    const projectsTableCategoryText = document.querySelectorAll('.edit ');
    projectsTableCategoryText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);

  useEffect(() => {
    const projectsTableCategoryText = document.querySelectorAll('.delete ');
    projectsTableCategoryText.forEach((element) => {
      element.style.color = darkMode ? '#000000' : '#ffffff';
    });
  }, [darkMode]);

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
          </Typography>
          <Tooltip>
            <button onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </button>
          </Tooltip>
          <IconButton color="primary">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: '8px',
                boxShadow: 3,
                minWidth: '200px',
              },
            }}
          >
            <MenuItem onClick={handleProfile} sx={{ py: 1 }}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1 }}>
              <SettingsIcon sx={{ mr: 2 }} />
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLockScreen} sx={{ py: 1 }}>
              <LockIcon sx={{ mr: 2 }} />
              Lock Screen
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut} sx={{ py: 1 }}>
              <ExitToAppIcon sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {isLocked && <LockScreen onUnlock={handleUnlockScreen} />}
    </ThemeProvider>
  );
};

export default Navbar;
