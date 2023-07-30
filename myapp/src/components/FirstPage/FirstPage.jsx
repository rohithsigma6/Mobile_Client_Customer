import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
} from '@mui/material';

const HomePage = () => {
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://browserstack.wpenginepowered.com/wp-content/uploads/2022/10/Testing-on-real-mobile-devices.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'red',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px',
  };

  const quotes = [
    "Discover the latest mobile phones in our Ecommerce Store!",
    "Stay connected with the best smartphones!",
    "Shop the best deals on mobile devices!",
    "Find your perfect mobile companion!",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div style={pageStyle}>
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Mobile Ecommerce Store!
        </Typography>
        <Typography variant="h6" gutterBottom>
          "{randomQuote}"
        </Typography>
        <div style={buttonContainerStyle}>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Register
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
