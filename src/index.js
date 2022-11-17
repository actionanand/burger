import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const app = (
  <BrowserRouter basename='burger'>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
// ReactDOM.render(<App />, document.getElementById('root'));
