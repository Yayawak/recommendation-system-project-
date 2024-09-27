import React from 'react';
import { Button, ButtonGroup as MUIButtonGroup } from '@mui/material';
import '../assets/styles/ButtonGroup.css'

const ButtonGroup = () => {
    return (
        <MUIButtonGroup
            aria-label="button group"
            variant="outlined"
            color="primary"
            orientation="horizontal"
            size="small"
            spacing={2}
        >
            <Button>Shirt</Button>
            <Button>T-shirt</Button>
            <Button>Shoes</Button>
            <Button>Watch</Button>
            <Button>Shorts</Button>
        </MUIButtonGroup>
    );
}

export default ButtonGroup;
