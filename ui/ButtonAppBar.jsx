import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { RoutePaths } from './RoutePaths';


export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1 }}>
            <a onClick={() => navigate('/')}>
              Meteor Wallet
            </a>
          </Typography>
          <div>
            {!isLoadingLoggedUser && !loggedUser && (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => navigate(RoutePaths.ACCESS)}
              >
                Sign Up
              </Button>
            )}
            {!isLoadingLoggedUser && loggedUser && (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => Meteor.logout(RoutePaths.ACCESS)}
              >
                Log Out
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
