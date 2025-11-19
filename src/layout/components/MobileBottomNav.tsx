import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: "block", sm: "none" }, // mobile 전용
                zIndex: 1000
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={location.pathname}
                onChange={(e, newValue) => navigate(newValue)}
            >
                <BottomNavigationAction 
                    label="Home" 
                    value="/" 
                    icon={<HomeIcon />} 
                />
                <BottomNavigationAction 
                    label="Search" 
                    value="/search" 
                    icon={<SearchIcon />} 
                />
                <BottomNavigationAction 
                    label="Your Library" 
                    value="/library" 
                    icon={<LibraryBooksIcon />} 
                />
            </BottomNavigation>
        </Paper>
    );
};

export default MobileBottomNav;
