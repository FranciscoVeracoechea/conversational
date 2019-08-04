import React, { useState } from 'react';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Tooltip, Button, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// components
import Register from '../Register';
import Login from '../Login';


const NavBarDesktop = ({
  classes, menuId, handleProfileMenuOpen, user, logout, push,
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleOnShowRegister = value => () => setShowRegister(value);
  const handleOnShowLogin = value => () => setShowLogin(value)

  return (
    <div className={classes.sectionDesktop}>
      {
        user
          ? (
            <>
              <Tooltip title="explore">
                <IconButton className={classes.icon} color="secondary">
                  <FontAwesomeIcon icon="search" size="sm" />
                </IconButton>
              </Tooltip>
              <IconButton className={classes.icon} aria-label="Show 4 new mails" color="secondary">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton className={classes.icon} aria-label="Show 17 new notifications" color="secondary">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button
                className={classes.icon}
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="secondary"
              >
                <AccountCircle />
                { user.username }
              </Button>
              <IconButton
                edge="end"
                aria-label="logout"
                aria-haspopup="true"
                onClick={() => {
                  logout();
                  push('/');
                }}
                color="secondary"
              >
                <FontAwesomeIcon icon="sign-out-alt" size="sm" />
              </IconButton>
            </>
          )
          : (
            <>
              <Tooltip title="explore">
                <IconButton className={classes.icon} color="secondary">
                  <FontAwesomeIcon icon="search" size="sm" />
                </IconButton>
              </Tooltip>
              <Tooltip title="chats">
                <IconButton color="secondary" className={classes.icon}>
                  <FontAwesomeIcon icon="comments" size="sm" />
                </IconButton>
              </Tooltip>
              <Tooltip title="register">
                <IconButton color="secondary" className={classes.icon} onClick={handleOnShowRegister(true)}>
                  <FontAwesomeIcon icon="user-plus" size="sm" />
                </IconButton>
              </Tooltip>
              <Tooltip title="sign in">
                <IconButton color="secondary" className={classes.icon} onClick={handleOnShowLogin(true)}>
                  <FontAwesomeIcon icon="sign-in-alt" size="sm" />
                </IconButton>
              </Tooltip>
            </>
          )
      }
      <Register
        open={showRegister}
        onClose={handleOnShowRegister(false)}
      />
      <Login
        open={showLogin}
        onClose={handleOnShowLogin(false)}
      />
    </div>
  );
};

export default NavBarDesktop;
