import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === 'user@example.com' && password === 'password123') {
      resolve();
    } else {
      reject(new Error('Invalid email or password'));
    }
  });
};

const Login = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" className={styles.img} />
      <h1 className={styles.h1}>Login to your account.</h1>
      <p className={styles.p}>Please sign in to your account</p>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className={`${styles.input} ${darkMode ? styles.darkMode : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='new-password'
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`${styles.input} ${darkMode ? styles.darkMode : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            required
          />
          <label>
            <input type="checkbox" name="_remember_me" unchecked className='RemeberMe'/>
            &nbsp;&nbsp; Remeber Me
          </label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={`${styles.signInButton} ${darkMode ? styles.darkMode : ''}`}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
