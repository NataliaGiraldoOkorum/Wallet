import React from 'react';
import {BrowserRouter} from "react-router-dom"
import ButtonAppBar from './ButtonAppBar';
import { Router } from './Router';


export const App = () => (
  <BrowserRouter>
    <div>
      <ButtonAppBar />
      <div>
        <Router/>
      </div>
    </div>
    </BrowserRouter>
);



