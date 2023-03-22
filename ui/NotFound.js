import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const NotFound = () => {
    const navigate = useNavigate();
    return (
    <Grid
    container
    direction="column-reverse"
    justifyContent="center"
    alignItems="center">
        <h3>Page not found</h3>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(RoutePaths.HOME)}
          >
            Go Home
        </Button>
    </Grid>
    );
};
