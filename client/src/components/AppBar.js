import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function ButtonAppBar() {
  const navigate = useNavigate()
  function logout(){
    Cookies.remove('token')
   navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {/* <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
         */}
         <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/'  className='a-text'>
            Expensoo

            </Link>
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        
          <Link to='/login' className='a-text'>
          <Button color="inherit">Login</Button>
          </Link>
          
          <Link to='/register' className='a-text'>
          <Button color="inherit">Register</Button>
          </Link>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}