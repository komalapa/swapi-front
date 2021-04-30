import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {getListByLink, digListByLink} from './swapiModule/swapiModule.js'


// getListByLink()//'https://swapi.dev/api/films')
// .then(data => {console.log("then ", data)})
// .catch(error => {console.log("catch ", error)});

// digListByLink('https://swapi.dev/api/people')
// .then(data => {console.log("then ", data)})
// .catch(error => {console.log("catch ", error)});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
