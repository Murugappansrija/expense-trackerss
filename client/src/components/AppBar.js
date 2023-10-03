import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  function totallogout() {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="a-text">
              Expensoo
            </Link>
          </Typography>
          {isAuthenticated && (
            <Button color="inherit" onClick={totallogout}>
              Logout
            </Button>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="a-text">
                <Button color="inherit">Login</Button>
              </Link>

              <Link to="/register" className="a-text">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
          {/* <Button color="inherit" onClick={totallogout}>Logout</Button> */}
          {/*         
          <Link to='/login' className='a-text'>
          <Button color="inherit">Login</Button>
          </Link>
          
          <Link to='/register' className='a-text'>
          <Button color="inherit">Register</Button>
          </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
