import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { Meteor } from 'meteor/meteor';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { RoutePaths } from './RoutePaths';

export const Access = () => {
    const navigate = useNavigate();

    const onEnterToken = () => {
        navigate(RoutePaths.HOME);
    };

    const loginWithGoogle = () => {
        Meteor.loginWithGoogle({ loginStyle: 'redirect' });
    };

    return (
        <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
            <Passwordless onEnterToken={onEnterToken}/>
             <h3>or</h3>
            <Button
                variant="contained"
                size="small"
                rowSpacing={3}
                onClick={loginWithGoogle}>
                    Login With Google
            </Button>
        </Grid>
    );
};
