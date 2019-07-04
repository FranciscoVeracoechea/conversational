import { createMuiTheme } from '@material-ui/core/styles';

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
      main: '#d9534f',
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
