import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './shared/services/store/store';
import App from './app/App';

const doca = document.getElementById('root');

const root = ReactDOM.createRoot(doca!);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
     <Provider store={store}>
       <App/>
     </Provider>
     </BrowserRouter>
    </React.StrictMode>
  );

