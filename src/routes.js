import React from 'react';
import { browserHistory } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Home from './component/Home';
import Truchet from './container/Truchet';

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/truchet" exact component={Truchet} />
    </Switch>
  </BrowserRouter>
)
