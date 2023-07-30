import React from 'react'
import './App.css';
import RegistrationPage from './components/Register/RegistrationPage';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/FirstPage/FirstPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './components/Product/ProductsPage';
import Navbar from './components/NavBar/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage/>} /> */}
        <Route path="/" element={<Navbar> <ProductsPage/></Navbar>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
      </Routes> 

    </BrowserRouter>
  );
}

export default App;
