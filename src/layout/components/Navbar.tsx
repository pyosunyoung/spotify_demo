import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#222",
    color: "white",
    minWidth: "160px",
    borderRadius: "8px",
    marginTop: theme.spacing(1),
  },
}));

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px" pr={2}>
      {userProfile ? (
        <ProfileContainer>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar
              src={userProfile.images?.[0]?.url}
              alt={userProfile.display_name}
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            keepMounted
          >
            <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
          </ProfileMenu>
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
