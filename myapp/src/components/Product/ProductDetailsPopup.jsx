import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { Rating } from '@mui/material';

const ProductDetailsPopup = ({ product, onClose }) => {
  const handleAddToCart = () => {

    console.log('Product added to cart:', product.productName);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={{ paddingBottom: 0 }}>
        <span role="img" aria-label="Mobile Phone">
          
        </span>{' '}
        {product.productName}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                height="100%"
                image={product.imageURL}
                alt={product.productName}
                style={{ borderRadius: 8 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Brand: {product.brand}
              </Typography>
              <Typography gutterBottom variant="body1">
                Model: {product.model}
              </Typography>
              <Typography gutterBottom variant="body1">
                Color: {product.color}
              </Typography>
              <Typography gutterBottom variant="body1">
                Storage: {product.storage}GB
              </Typography>
              <Typography gutterBottom variant="body1">
                RAM: {product.ram}GB
              </Typography>
              <Typography gutterBottom variant="body1">
                Display Size: {product.displaySize}
              </Typography>
              <Typography gutterBottom variant="body1">
                Resolution: {product.resolution}
              </Typography>
              <Typography gutterBottom variant="body1">
                Battery Capacity: {product.batteryCapacity}mAh
              </Typography>
              <Typography gutterBottom variant="body1">
                Main Camera: {product.camera.mainCamera}MP, Front Camera: {product.camera.frontCamera}MP
              </Typography>
              <Typography gutterBottom variant="body1">
                Processor: {product.processor.name}
              </Typography>
              <Typography gutterBottom variant="body1">
                Number of Cores: {product.processor.cores}
              </Typography>
              <Typography gutterBottom variant="body1">
                Clock Speed: {product.processor.clockSpeed}
              </Typography>
              <Typography gutterBottom variant="body1">
                Operating System: {product.operatingSystem}
              </Typography>
              <Typography gutterBottom variant="body1">
                Bluetooth: {product.connectivity.bluetooth ? 'Yes' : 'No'}
              </Typography>
              <Typography gutterBottom variant="body1">
                Wi-Fi: {product.connectivity.wifi ? 'Yes' : 'No'}
              </Typography>
              <Typography gutterBottom variant="body1">
                4G: {product.connectivity['4g'] ? 'Yes' : 'No'}
              </Typography>
              <Typography gutterBottom variant="body1">
                5G: {product.connectivity['5g'] ? 'Yes' : 'No'}
              </Typography>
              <Typography gutterBottom variant="body1">
                USB Type: {product.connectivity.usbType}
              </Typography>
              <Typography gutterBottom variant="body1">
                Price: ${product.price}
              </Typography>
              <Typography gutterBottom variant="body1">
                Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
              </Typography>
              <Rating name="product-rating" value={product.ratings} readOnly />
            </CardContent>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ paddingTop: 0 }}>
        <Button onClick={handleAddToCart} color="primary" variant="contained" startIcon={<AddShoppingCartIcon />}>
          Add to Cart
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsPopup;
