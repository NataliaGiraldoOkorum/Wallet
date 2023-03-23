import React from 'react';
import { ContactForm } from './ContactForm.jsx';
import { ContactList } from './ContactList.jsx';
import Wallet from './Wallet.jsx';


export const Home = () =>
     (
    <>
        <Wallet />
        <ContactForm />
        <ContactList />
    </>
);
