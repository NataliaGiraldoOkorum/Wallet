import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from "./NotFound";
import { RoutePaths } from './RoutePaths';
import { SignUp } from './Access';

export const Router = () => (
<Routes>
    <Route path='/' element={<Home />} /> 
    <Route path='/sign-up' element={<SignUp />} /> 
    <Route path="*" element={<NotFound />} /> 
</Routes>
);