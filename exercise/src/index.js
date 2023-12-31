import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App2 from './App2';

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
// import store from './store';
import store from './store/toolkitIndex';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // history router
  <BrowserRouter>
    {/* pass store into App */}
    <Provider store={store}>
      <App2 />
    </Provider>
  </BrowserRouter>
);

