import React,{useState,useEffect} from 'react';
import { Currentuser } from "../../utils/auth";
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Grid,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const navbarStyles = {
  backgroundColor: '#2196f3',
};

const titleStyles = {
  flexGrow: 1,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#fff', 
};

const linkContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '400px', 
};

const linkStyles = {
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
};

const avatarStyles = {
  width: '32px',
  height: '32px',
  marginLeft: '8px',
};

const Navbar = ({children}) => {
    
const [user, setUser] = useState("")
const navigate = useNavigate()
const validateToken = async () => {
    try {
        const response = await Currentuser()
        console.log(response)
        if (response.data.success) {
            console.log(response)
            setUser(response.data.details)
            navigate("/")
        }
        else {
            alert(response.message)
            navigate("/")
        }
    }
    catch (err) {
        navigate("/")
        alert("error")
    }
}
useEffect(() => {
    if (localStorage.getItem("token")) {
        validateToken()
        navigate("/")
    }
    else {
        alert("please login to continue")
        navigate("/")
    }
}, [])
  return (
    <div>
    <AppBar position="static" style={navbarStyles}>
      <Toolbar>
   
        <Typography variant="h6" component={RouterLink} to="/" style={titleStyles}>
          Ecommerce App
        </Typography>

  
        <div style={linkContainerStyles}>
          <RouterLink to="/" style={linkStyles}>
            <Typography variant="body1">Home</Typography>
          </RouterLink>
          <RouterLink to="/cart" style={linkStyles}>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Typography variant="body1">Cart</Typography>
          </RouterLink>
          <RouterLink to="/orders" style={linkStyles}>
            <IconButton color="inherit">
              <ListIcon />
            </IconButton>
            <Typography variant="body1">Orders</Typography>
          </RouterLink>
          <RouterLink to="/profile" style={linkStyles}>
            <Avatar
              alt="Profile"
              src="/path/to/profile-picture.jpg" 
              style={avatarStyles}
            />
            <Typography variant="body1">Profile</Typography>
          </RouterLink>
          <RouterLink to="/login" style={linkStyles}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <Typography variant="body1">Logout</Typography>
          </RouterLink>
        </div>
      </Toolbar>
    </AppBar>
    {
        children
    }
    </div>
  );
};

export default Navbar;
