import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from './Context/AuthContext/AuthContext.js';
import { PostContextProvider } from './Context/PostContext/PostContext.js';
import { SocketContextProvider } from './Context/SocketContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
