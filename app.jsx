import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App.jsx'
import './scss/styles.scss'

document.addEventListener('DOMContentLoaded', function(){

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
