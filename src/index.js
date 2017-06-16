import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store}>
    <h1>hello</h1>
  </Provider>
);

ReactDom.render(
  App,
  document.getElementById('app'),
);
