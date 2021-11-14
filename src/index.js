import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GlobalState} from './components/state/provider'
import {reducer, initialState } from './components/state/reducer';
ReactDOM.render(
  <GlobalState reducer={reducer} initialState={initialState}>
    <App/>
  </GlobalState>,
    
  document.getElementById('root')
);
