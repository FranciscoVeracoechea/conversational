import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// components
import Register from '../Register';


const NavBarDesktop = ({
  classes, menuId, handleProfileMenuOpen, user,
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const handleOnShowRegister = value => () => setShowRegister(value);

  return (
    <div className={classes.sectionDesktop}>
      {
        user
          ? (
            <>
              <IconButton aria-label="Show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="Show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          )
          : (
            <>
              <Tooltip title="explore">
                <IconButton
                  className={classes.icon}
                  edge="end"
                  aria-label="Account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="secondary"
                >
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
                <IconButton color="secondary" className={classes.icon}>
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
    </div>
  );
};

export default NavBarDesktop;
