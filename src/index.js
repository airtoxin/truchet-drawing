import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';

const App = (
  <Provider store={store}>
    {routes}
  </Provider>
);

ReactDom.render(
  App,
  document.getElementById('app'),
);
