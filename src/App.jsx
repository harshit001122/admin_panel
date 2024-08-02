import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Profile from './components/Profile/Profile.jsx'

const DarkModeButton = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  if (location.pathname === '/dashboard') return null;

  
  
  return (
    <button onClick={toggleDarkMode} style={{ position: 'fixed', top: 10, right: 10, backgroundColor: 'black' }}>
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </button>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const user = {
    id: '123456',
    email: 'user@example.com',
  };
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Login darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
