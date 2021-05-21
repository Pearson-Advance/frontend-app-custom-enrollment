import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../Dashboard';

const MainApp = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={Dashboard}
    />
  </Switch>
);

export default MainApp;
