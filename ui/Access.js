import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './components/ErrorAlert.jsx';
import { RoutePaths } from './RoutePaths';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export const Access = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(true);

    const signUp = (e) => {
        e.preventDefault();
        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                console.error('Error creating user', err);
                setError(err);
                return;
            }
            navigate(RoutePaths.HOME);
        });
    };

    const signIn = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                console.error('Error signing  in the user', err);
                setError(err);
                return;
            }
            navigate(RoutePaths.HOME);
        });
    };
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <h3>
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </h3>
            {error && <ErrorAlert message={error.reason || 'Uknown error'} />}
            <form>
                <Grid>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id="email"
                            label="email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" />
                    </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField
                                id="password"
                                label="password"
                                variant="standard"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="text" />
                        </Box>
                </Grid>
            </form>
                <br/>
                <Grid
                container
                direction="row-reverse"
                justifyContent="center"
                alignItems="center"
                >
            {isSignUp &&
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={signUp}
                    type="submit"
                >
                    Sign Up
                </Button>
            }
            {!isSignUp &&
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={signIn}
                type="submit"
            >
                Sign In
            </Button>
            }
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => navigate(RoutePaths.HOME)}
            >
                Back to Home
            </Button>
                </Grid>
            <div>

                <a onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp
                        ? 'If you already have an account, click here'
                        : 'If you dont have an account, click here'}
                </a>
            </div>
            <div>
            <h5>
                <a
                onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}>
                    Forgot password?
                </a>
            </h5>
            </div>

        </Grid>
    );
};
