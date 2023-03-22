import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ErrorAlert from './components/ErrorAlert';
import Alert from '@mui/material/Alert';
import { RoutePaths } from './RoutePaths';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState();

    const forgotPassword = (e) => {
        e.preventDefault();
        Accounts.forgotPassword({ email }, (err) => {
            if (err) {
                console.error('Error requesting the link to create a new password', err);
                setError(err);
                return;
            }
            setEmail('');
            setError(null);
            <Alert severity="success" color="info">
                You should receve a reset email!
            </Alert>
        })
    }

    return (
        <div>
            <h3>
                Forgot Password
            </h3>
            {error && <ErrorAlert message={error.reason || 'Uknown error'} />}
            <form>
                <Grid container spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField id="email" label="email" variant="standard" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" />
                    </Box>
                </Grid>
            </form>
            <Button
                variant='contained'
                size="small"
                color="primary"
                onClick={forgotPassword}
                type="submit"
            >
                Send Reset Link
            </Button>

            <Button
                variant='contained'
                size="small"
                color="primary"
                onClick={() => navigate('/sign-up')}
            >
                Back to Access
            </Button>
        </div>
    )
}