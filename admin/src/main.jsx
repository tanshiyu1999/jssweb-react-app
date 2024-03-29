import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./state/index.js";
import { setupListeners } from '@reduxjs/toolkit/dist/query';



const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

setupListeners(store.dispatch);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
)
