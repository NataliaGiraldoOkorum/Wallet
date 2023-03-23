import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { RoutePaths } from './RoutePaths';
import { Access } from './Access';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { LoggedUserOnly } from './components/LoggedUserOnly';
import { AnonymousOnly } from './components/AnonymousOnly';
import { RemoveTransaction } from './RemoveTransaction';
import { AdminOnly } from './components/AdminOnly';

export const Router = () => (
<Routes>
    <Route
    path={RoutePaths.HOME}
    element={
        <LoggedUserOnly>
            <Home />
        </LoggedUserOnly>
    }
    />
    <Route
    path={RoutePaths.ACCESS}
    element={
        <AnonymousOnly>
            <Access/>
        </AnonymousOnly>
    }
    />  
    <Route
    path={RoutePaths.REMOVE_TRANSACTION}
    element={
        <AdminOnly>
            <RemoveTransaction />
        </AdminOnly>
    }
    />
    <Route path="*" element={<NotFound />} />
</Routes>
);
