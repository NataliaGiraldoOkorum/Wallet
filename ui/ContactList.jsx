import React, { memo } from 'react';
import { Meteor } from 'meteor/meteor';
import ContactsCollection from '../api/collections/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import Loading from './components/Loading.jsx';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ArchiveIcon from '@mui/icons-material/Archive';


export const ContactList = () => {
    const isLoading = useSubscribe('myContacts');
    const contacts = useFind(() =>
        ContactsCollection.find(
            { archived: { $ne: true } },
            { sort: { createdAt: -1 } }
        )
    );

    const archiveContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.archive', { contactId: _id });
    };

    if (isLoading()) {
        return < Loading />;
    }

    const ContactItem = memo(({ contact }) => (
        <Box
            sx={{
                width: 250,
                height: 90,
                p: 2,
                border: '1px grey',
                '&:hover': {
                    opacity: [0.5, 0.5, 0.5],
                },
            }}
        >
            <ListItem alignItems="flex-start">
                {contact.imageURL && (
                    <ListItemAvatar>
                        <Avatar alt="" src={contact.imageURL} />
                    </ListItemAvatar>
                )}
                <ListItemText
                    primary={contact.name}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body3"
                                color="text.primary"
                            >
                                {contact.email}
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body3"
                                    color="text.primary"
                                >
                                    {contact.walletId}
                                </Typography>
                                <IconButton
                                    aria-label="delete"
                                    onClick={(event) =>
                                        archiveContact(event, contact._id)}>
                                    <ArchiveIcon />
                                </IconButton>
                            </Box>
                        </>
                    }
                />
            </ListItem>
        </Box>
    ));

    return (
        <div>
            <h3>Contact List</h3>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {contacts.map((contact) => (
                        <ContactItem key={contact._id} contact={contact} />
                    ))}
                </List>
            </Grid>
        </div>
    );
};
