import { Button } from '@mui/material';
import React, { useState } from 'react'; 
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ErrorAlert from './components/ErrorAlert';

export const Access = () => {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);

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

return (
<div>
    <h3>sign up</h3>
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

    <Button 
        variant='contained'
        size="small"
        color="secondary" 
        onClick={signUp}
        type= "submit"
        >
            Sign Up
    </Button>
    <Button 
        variant='contained'
        size="small"
        color="secondary" 
        onClick={() => navigate('/') }
        >
            Back to Home
    </Button>
</div>
    )
}