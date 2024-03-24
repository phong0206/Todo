import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as api from '../../apis/api';

const Header = () => {
  const { user, clear } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Mở menu khi Avatar được nhấp
  const handleAvatarClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Điều hướng tới trang Profile
  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  // Đăng xuất và xóa token
  const handleLogoutClick = async () => {
    await api.logout();
    clear();
    navigate('/login');
    handleClose();
  };

  // Lấy chữ cái đầu tiên của tên người dùng
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n: any) => n[0])
      .join('');
  };

  return (
    <div
      style={{
        backgroundColor: '#052c43',
        height: '4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
      }}
    >
      <IconButton
        onClick={handleAvatarClick}
        style={{ padding: 0, marginRight: '15px', color: 'white' }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {user && user.name ? getInitials(user.name) : '?'}
        </Avatar>
        &nbsp;{user ? user.name : ''}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
