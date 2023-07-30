import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

const RegistrationPage = () => {
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName) {
      setErrors({ ...errors, firstName: 'First Name is required' });
      return;
    }
    if (!lastName) {
      setErrors({ ...errors, lastName: 'Last Name is required' });
      return;
    }
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
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      return;
    }

    try {

    const response = await axios.post('http://localhost:8289/v1/createuser',formData)
    console.log(response)
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    
    }
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form style={formStyle} onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegistrationPage;
