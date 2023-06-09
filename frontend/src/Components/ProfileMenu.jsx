import React, { useState } from 'react';
import {
  Menu, MenuItem, Divider, Tooltip
} from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import profile from '../Assets/profile.svg';
import Config from '../config.json';

function ProfileMenu () {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  function handleLogout () {
    const token = localStorage.getItem('token');

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    fetch(`http://localhost:${Config.BACKEND_PORT}/user/auth/logout`, request)
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('password');
          localStorage.removeItem('email');
          localStorage.removeItem('logged');
          window.location.href = '/'
        } else {
          res.json().then((data) => {
            console.log(token);
            console.log(data.error);
          });
        }
      });
  }

  return (
        <>
        <Tooltip title="Account settings">
          <AccountCircleIcon
            role="profile"
            src={profile}
            className="profile"
            alt="user profile"
            style={{ fontSize: '300%', marginLeft: 'auto', marginRight: '0px', cursor: 'pointer' }}
            onClick={handleClick}
            />
        </Tooltip>
      <Menu
        open={MenuOpen}
        anchorEl={anchorEl}
        id="account-menu"
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          }
        }}
        style={{ marginTop: '4%', marginLeft: '-2%' }}
      >
        <MenuItem role="account" onClick={() => { window.location.href = '/Account' } }>
          Account
        </MenuItem>
        <MenuItem role="create" onClick={() => { window.location.href = '/Create-Listing' } }>
          Create Listing
        </MenuItem>
        <Divider />
        <MenuItem role="logout" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;
