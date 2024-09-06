import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const TableBooking = ({ availableTables }) => {
  const [tablesLeft, setTablesLeft] = useState(availableTables);

  const bookTable = () => {
    if (tablesLeft > 0) {
      setTablesLeft(tablesLeft - 1);
      alert('Table booked successfully!');
    } else {
      alert('No tables available.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h6">Available Tables: {tablesLeft}</Typography>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button onClick={bookTable} variant="contained" color="primary" style={{ marginTop: '10px' }} disabled={tablesLeft === 0}>
          Book a Table
        </Button>
      </motion.div>
    </div>
  );
};

export default TableBooking;
