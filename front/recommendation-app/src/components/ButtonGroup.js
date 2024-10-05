import React from 'react';
import { Button, ButtonGroup as MUIButtonGroup } from '@mui/material';
import '../assets/styles/ButtonGroup.css';

const ButtonGroup = ({ searchByCategory }) => {
  return (
    <MUIButtonGroup
      aria-label="button group"
      variant="outlined"
      color="primary"
      orientation="horizontal"
      size="small"
      className="MUIButtonGroup"
    >
      <Button onClick={() => searchByCategory('Shirts')}>Shirt</Button>
      <Button onClick={() => searchByCategory('Tshirts')}>T-shirt</Button>
      <Button onClick={() => searchByCategory('Casual Shoes')}>Shoes</Button>
      <Button onClick={() => searchByCategory('Watches')}>Watch</Button>
      <Button onClick={() => searchByCategory('Shorts')}>Shorts</Button>
    </MUIButtonGroup>
  );
};

export default ButtonGroup;
