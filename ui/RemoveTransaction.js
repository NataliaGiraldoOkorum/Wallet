import { Button } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ErrorAlert from './components/ErrorAlert';
import Alert from '@mui/material/Alert';
import { RoutePaths } from './RoutePaths';

export const RemoveTransaction = () => {
    const navigate = useNavigate();
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState();

    const removeTransaction = (e) => {
        e.preventDefault();
        Meteor.call('transactions.remove', transactionId, (err) => {
            if (err) {
                console.error('Error trying to remove a transaction', err);
                setError(err);
                return;
            }
            setTransactionId('');
            setError(null);
            <Alert severity="info">
            The transaction removed!
            </Alert>;

        });
    };
    return (
        <div>
            <h3>
                Remove to Transaction
            </h3>
            {error && <ErrorAlert message={error.reason || 'Uknown error'} />}
            <form>
                <Grid container spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id="transactionId"
                            label="Transaction ID"
                            variant="standard"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            type="text" />
                    </Box>
                </Grid>
            </form>
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={removeTransaction}
                type="submit"
            >
                Remove
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
