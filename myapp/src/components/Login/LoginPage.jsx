import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://source.unsplash.com/1600x900/?mobile")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    textAlign: 'center',
  };
  const navigate = useNavigate()

  const paperStyle = {
    padding: '20px',
    maxWidth: 400,
    background: 'rgba(255, 255, 255, 0.8)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: 'Invalid email address' });
      return;
    }
    if (!password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    try {
      
      const resp = await axios.post('http://localhost:8289/v1/login',formData)
      console.log(resp)
      if(resp){
        navigate('/')
      }
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Login failed:', error);
     
    }
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form style={formStyle} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
