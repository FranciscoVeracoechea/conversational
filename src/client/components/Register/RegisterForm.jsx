import React, { useState } from 'react';
import { useEventCallback } from 'rxjs-hooks';
import { from, merge } from 'rxjs';
import {
  tap, map, exhaustMap, filter, scan, takeLast,
} from 'rxjs/operators';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  InputAdornment, IconButton, CircularProgress, makeStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// helper
import { arrayToObject, isArray } from '../../../shared/utils/functional';


const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const Register = ({
  open, onClose, fetchRegister, auth,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const getError = (field) => {
    if (auth.errors && isArray(auth.errors)) {
      const error = auth.errors.find(err => err.param === field);
      if (error) {
        return { error: true, helperText: error.msg };
      }
    }
    return {};
  };

  const [handleOnSubmit] = useEventCallback(
    (event$, inputs$, _) => merge(
      event$.pipe(
        tap(e => e.preventDefault()),
        exhaustMap(e => from([...e.target]).pipe(
          filter(element => (element.value && element.name && element.id)),
          map(input => [input.name, input.value]),
          scan(arrayToObject, {}),
          takeLast(1),
          tap(data => fetchRegister(data)),
        )),
      ),
      inputs$.pipe(
        filter(([loading, errors]) => !loading && errors === null),
        tap(() => onClose()),
      ),
    ),
    [], // initial value
    [auth.loading, auth.errors], // inputs
  );

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-register-title">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle id="form-register-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address, username and password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            id="username"
            label="Username"
            type="text"
            fullWidth
            required
            {...getError('username')}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            required
            {...getError('email')}
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            margin="dense"
            fullWidth
            {...getError('password')}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} size="xs" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          {
            (!auth.loading)
              ? (
                <>
                  <Button
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Subscribe
                  </Button>
                </>
              )
              : <CircularProgress className={classes.progress} />
          }
        </DialogActions>
      </form>
    </Dialog>
  );
};

Register.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Register;
