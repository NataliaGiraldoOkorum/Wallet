import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { Meteor } from 'meteor/meteor';
import { Button } from '@mui/material';

export const Access = () => {
    const navigate = useNavigate();

    const onEnterToken = () => {
        navigate('/');
    };

    const loginWithGoogle = () => {
        Meteor.loginWithGoogle({ loginStyle: 'redirect' });
    };

    return (
        <div className="flex flex-col items-center">
            <Passwordless onEnterToken={onEnterToken}/>
            <Button onClick={loginWithGoogle}>
                Login With Google
            </Button>
        </div>
    );
};
