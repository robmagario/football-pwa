import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import HelloWorld from './components/HelloWorld/HelloWorld';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles/styles.scss';
import {Provider} from 'react-redux';
import Store from './store.js';
const theme = createMuiTheme();
const storeInstance = Store();

render((
  <Provider store={storeInstance}>
    <React.Fragment>

      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>

    </React.Fragment>
  </Provider>
), document.getElementById('app'));
