import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  InputAdornment, IconButton, FormControl, InputLabel, Input,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Register = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-register-title">
      <DialogTitle id="form-register-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address, username and password here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <FormControl fullWidth margin="dense">
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={showPassword ? 'text' : 'password'}
            margin="dense"
            endAdornment={(
              <InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} size="xs" />
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Register.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Register;
