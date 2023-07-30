import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import ProductDetailsPopup from './ProductDetailsPopup';

const ProductCard = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handlePopupOpen}>
          <CardMedia
            component="img"
            height="400"
            image={product.imageURL} 
            alt={product.productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${product.price} 
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button variant="contained" color="primary" fullWidth>
          Add to Cart
        </Button>
      </Card>
      {showPopup && <ProductDetailsPopup product={product} onClose={handlePopupClose} />}
    </>
  );
};

export default ProductCard;
