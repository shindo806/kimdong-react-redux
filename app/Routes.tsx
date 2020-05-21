import React from 'react';
import { Route, Switch, Router } from 'react-router';
import { createHashHistory } from 'history';

import ThanhtoanPage from 'containers/ThanhToanPage';
import QuanLyDonHangPage from 'containers/QuanLyDonHangPage';
import App from './containers/App';
import routes from './constants/routes.json';

const history = createHashHistory();

export default function Routes() {
  return (
    <App>
      <Router history={history}>
        <Switch>
          <Route path={routes.QUANLYDONHANG} component={QuanLyDonHangPage} />
          <Route path={routes.HOME} component={ThanhtoanPage} />
        </Switch>
      </Router>
    </App>
  );
}
