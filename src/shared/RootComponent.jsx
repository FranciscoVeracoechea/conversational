// Dependencies
import React from 'react';
import { setConfig, hot } from 'react-hot-loader';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
// theme
import theme from '../shared/utils/theme';
// Client App
import App from '../client/components/App';
// Routes
import routes from './routes';


const Root = () => (
  <ThemeProvider theme={theme}>
    <App>
      <Switch>
        { routes.map(props => <Route key={props.path} {...props} />) }
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </App>
  </ThemeProvider>
);

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

export default hot(module)(Root);
