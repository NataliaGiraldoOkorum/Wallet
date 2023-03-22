import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react'; 
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ErrorAlert from './components/ErrorAlert';
import { RoutePaths } from './RoutePaths';

export const Access = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState();
const [isSignUp, setIsSignUp] = useState(true);

 const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password}, (err) => {
        if(err){
            console.error('Error creating user', err);
            setError(err);
            return;
        }
        navigate('/');
    })
}

const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (err) => {
        if(err){
            console.error('Error signing  in the user', err);
            setError(err);
            return;
        }
        navigate('/');
    });
};



return (
<div>
    <h3>
        {isSignUp ? 'Sign Up' : 'Sign In'}
    </h3>
    {error && <ErrorAlert message={error.reason || 'Uknown error'}/>}
    <form>
        <Grid container spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField id="email" label="email" variant="standard" value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text" />
          </Box>     
        </Grid> 
        <Grid container spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField id="password" label="password" variant="standard" value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text" />
          </Box>     
        </Grid> 
    </form>

    {isSignUp && <Button 
        variant='contained'
        size="small"
        color="secondary" 
        onClick={signUp}
        type= "submit"
        >
            Sign Up
    </Button>
    }
    {!isSignUp && <Button 
        variant='contained'
        size="small"
        color="secondary" 
        onClick={signIn}
        type= "submit"
        >
            Sign In
    </Button>
    }
    <Button 
        variant='contained'
        size="small"
        color="secondary" 
        onClick={() => navigate('/') }
        >
            Back to Home
    </Button>

    <div>
        <a onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp 
            ? 'If you already have an account, click here' 
            : 'If you dont have an account, click here'}
        </a>
    </div>
    <div>
        <a onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}>
            Forgot password?
        </a>
    </div>
</div>
    )
}