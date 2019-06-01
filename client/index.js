import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {HashRouter} from 'react-router-dom';

const root = document.querySelector('#root');
ReactDOM.render(
<HashRouter><App /></HashRouter>, root);
