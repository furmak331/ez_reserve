import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#6200ea' }}>
      <Toolbar>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Restaurant Reservation
          </Typography>
        </motion.div>
        <Button component={Link} to="/" color="inherit" style={{ marginLeft: 'auto' }}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
