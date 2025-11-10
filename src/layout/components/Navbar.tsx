import React from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

const Navbar = () => {
  const {data:userProfile} = useGetCurrentUserProfile();
  const handleMenuOpen = () => {

  }

  const handleMenuClose = () => {
    
  }
  const logout = () => {

  }
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        {userProfile ? (
    <ProfileContainer>
      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar
          src={userProfile.images[0]?.url}
          alt={userProfile.display_name}
        />
      </IconButton>
      <ProfileMenu
        anchorEl={null} // 수정 필요
        open={false} // 수정 필요
        // anchorEl={anchorEl}
        // open={Boolean(anchorEl)}
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
  )
}

export default Navbar