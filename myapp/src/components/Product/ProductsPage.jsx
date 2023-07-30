// http://localhost:8289/v1/getallproducts

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import ProductDetailsPopup from './ProductDetailsPopup'; 

const ProductsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState('ratingHighToLow');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  useEffect(() => {
 
    fetch('http://localhost:8289/v1/getallproducts')
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetailsPopup = () => {
    setSelectedProduct(null);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleRamChange = (event) => {
    setSelectedRam(event.target.value);
  };

  const handleBatteryChange = (event) => {
    setSelectedBattery(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const filteredProducts = productsData.filter((product) => {
    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }

    if (selectedRam.length > 0 && !selectedRam.includes(product.ram)) {
      return false;
    }

    if (selectedBattery.length > 0 && !selectedBattery.includes(product.batteryCapacity)) {
      return false;
    }

    return true;
  });

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'priceHighToLow') {
      return b.price - a.price;
    } else if (sortOption === 'ratingHighToLow') {
      return b.ratings - a.ratings;
    } else if (sortOption === 'ratingLowToHigh') {
      return a.ratings - b.ratings;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const productCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '12px',
  };

  const productImageStyles = {
    height: 200,
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  };

  const productNameStyles = {
    fontWeight: 'bold',
    color: '#333',
  };

  const viewDetailsButtonStyles = {
    marginTop: 'auto',
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  };

  const formControlStyles = {
    minWidth: '100%',
    marginBottom: '16px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl variant="outlined" sx={formControlStyles}>
            <InputLabel>Brand</InputLabel>
            <Select value={selectedBrand} onChange={handleBrandChange} label="Brand">
              <MenuItem value="">All Brands</MenuItem>
              <MenuItem value="Brand X">Brand X</MenuItem>
              <MenuItem value="Brand Y">Brand Y</MenuItem>
            
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={formControlStyles}>
            <InputLabel>Ram</InputLabel>
            <Select
              multiple
              value={selectedRam}
              onChange={handleRamChange}
              label="Ram"
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value={2}>2 GB</MenuItem>
              <MenuItem value={4}>4 GB</MenuItem>
              <MenuItem value={6}>6 GB</MenuItem>
              <MenuItem value={8}>8 GB</MenuItem>
              <MenuItem value={12}>12 GB</MenuItem>
              <MenuItem value={16}>16 GB</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={formControlStyles}>
            <InputLabel>Battery Capacity</InputLabel>
            <Select
              multiple
              value={selectedBattery}
              onChange={handleBatteryChange}
              label="Battery Capacity"
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value={3000}>3000 mAh</MenuItem>
              <MenuItem value={4000}>4000 mAh</MenuItem>
              <MenuItem value={5000}>5000 mAh</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortOptionChange} label="Sort By">
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="ratingHighToLow">Rating: High to Low</MenuItem>
              <MenuItem value="ratingLowToHigh">Rating: Low to High</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card sx={productCardStyles}>
                  <CardMedia
                    component="img"
                    sx={productImageStyles}
                    image={product.imageURL}
                    alt={product.productName}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={productNameStyles}>
                      {product.productName}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={viewDetailsButtonStyles}
                      onClick={() => handleViewDetails(product)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(sortedProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2, justifyContent: 'center' }}
          />
        </Grid>
      </Grid>
      {selectedProduct && (
        <ProductDetailsPopup product={selectedProduct} onClose={handleCloseDetailsPopup} />
      )}
    </Container>
  );
};

export default ProductsPage;
