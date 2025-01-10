import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Context } from './components/Context';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='572626520755-sc2cnocp45um3rslcdclofdj0evrh9ei.apps.googleusercontent.com'>
      <BrowserRouter>
        <Context>
          <App />
        </Context>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);