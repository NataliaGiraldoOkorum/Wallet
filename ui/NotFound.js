import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';


export const NotFound = () => {
    const navigate = useNavigate();
    return(
    <div >
        <h3>Page not found</h3>
        <Button variant='contained'
          size="small"
          color="secondary" 
          onClick={() => navigate(RoutePaths.HOME)}
          >
            Go Home
        </Button>
    </div>
    );
};