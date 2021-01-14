/* Copyright (C) Abbas Khan - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abbas Khan <abbaskhanwork@gmail.com>, Jan 2021
 */

/* React + App*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* Import css + sass files */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/scss/main.scss'

/* Misc imports */
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
        <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
