import React, { Fragment } from 'react';
import { render } from 'react-dom';

import { RecoilRoot } from 'recoil';

import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';

import './app.global.css';
import 'semantic-ui-css/semantic.min.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <RecoilRoot>
      <AppContainer>
        <Root />
      </AppContainer>
    </RecoilRoot>,
    document.getElementById('root')
  )
);
