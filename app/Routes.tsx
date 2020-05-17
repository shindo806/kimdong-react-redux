import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';

import ThanhtoanPage from './containers/ThanhToanPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={ThanhtoanPage} />

        {/* Adding route above this line */}
        {/* <Route path={routes.HOME} component={HomePage} /> */}
      </Switch>
    </App>
  );
}
