import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./state(kiv)"


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const store = configureStore({
    reducer : { user : userReducer}
})

const queryClient = new QueryClient(); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
        <Provider store={store}>
            <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  </React.StrictMode>
);
