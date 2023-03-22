import * as React from 'react';
import { ModalAlert } from './components/ModalAlert';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import SelectContact from './components/SelectContact';
import Loading from './components/Loading';
import WalletsCollection from '../api/collections/WalletsCollection';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



export default function Wallet() {
  const isLoadingContacts = useSubscribe('contacts');
  const isLoadingWallets = useSubscribe('wallets');
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );

  const [wallet1] = useFind(() => WalletsCollection.find());

  const [open, setOpen] = React.useState(false);
  const [isTransfering, setIsTransfering] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");


  const addTransaction = () => {
    Meteor.call('transactions.insert', {
      isTransfering,
      // sourceWalletId: wallet1._id,
      destinationWalletId: destinationWallet?.walletId || "",
      amount: Number(amount),
    }, (errorResponse) => {
      if (errorResponse) {
        errorResponse.details?.forEach((error) => {
          setErrorMessage(error.message);
        });
      } else {
        setOpen(false);
        setDestinationWallet({});
        setAmount(0);
        setErrorMessage("");
      }
    })
  }

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />
  }

  const card = (
    <>
      <CardContent>
        <Box sx={{
          width: 300,
          height: 50
        }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Main Account
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Wallet ID:
          </Typography>
          <Box display="flex" justifyContent="space-between" >
            <Typography variant="subtitle2" >
              {wallet1._id}
            </Typography>
            <Typography variant="subtitle2">
              {`${wallet1.balance} ${wallet1.currency}`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          size="small"
          onClick={() => {
            setIsTransfering(false);
            setErrorMessage("");
            setOpen(true);
          }}
        >
          Add money
        </Button>
        <Button
          variant='contained'
          size="small"
          onClick={() => {
            setIsTransfering(true);
            setErrorMessage("");
            setOpen(true);
          }}
        >
          Transfer money
        </Button>
      </CardActions>
    </>
  );

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <ModalAlert
        open={open}
        setOpen={setOpen}
        title={
          isTransfering ? 'Transfer money to other wallet' : 'Add money to your wallet'
        }
        body={
          <>
            {isTransfering && (
              <Box >
                <SelectContact
                  title="Destination contact"
                  contacts={contacts}
                  selected={destinationWallet}
                  setSelected={setDestinationWallet}
                />
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                id="amount"
                label="Amount"
                variant="standard"
                type="number"
                placeholder="0.00"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>
          </>
        }
        footer={
          <Button
            type='button'
            variant='contained'
            size="small"
            onClick={addTransaction}
          >
            {isTransfering ? "Transfer" : "Add"}
          </Button>}
        errorMessage={errorMessage}
      />
    </>
  );
}