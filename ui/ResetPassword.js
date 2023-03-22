import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ErrorAlert from './components/ErrorAlert';
import Alert from '@mui/material/Alert';
import { RoutePaths } from './RoutePaths';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState();


    console.log('token', token);
    const resetPassword = (e) => {
        e.preventDefault();
        Accounts.resetPassword(token, password, (err) => {
            if (err) {
                console.error('Error trying to reset the paassword', err);
                setError(err);
                return;
            }
            setPassword('');
            setError(null);
            <Alert severity="success" color="info">
               Your new password is set, please sign in!
            </Alert>;
            navigate(RoutePaths.ACCESS);
        });
    };
    return (
        <div>
            <h3>
                Reset your Password
            </h3>
            {error && <ErrorAlert message={error.reason || 'Uknown error'} />}
            <form>
                <Grid container spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
id="password"
label="Password"
variant="standard"
value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text" />
                    </Box>
                </Grid>
            </form>
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={resetPassword}
                type="submit"
            >
                Set New Password
            </Button>

            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => navigate(RoutePaths.HOME)}
            >
                Back to Home
            </Button>
        </div>
    );
};
