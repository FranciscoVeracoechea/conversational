import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2ab1e0',
    },
    secondary: {
      main: '#084049',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f9f9fa',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
