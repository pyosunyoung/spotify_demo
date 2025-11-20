import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet } from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './components/LibraryHead';
import EmptyPlaylist from './components/EmptyPlaylist';
import Library from './components/Library';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';


const Layout = styled("div")({
    display: "flex",
    height: "100vh",
    padding: "16px",
    
})

const Sidebar = styled("div")(({ theme }) => ({
    width: "331px",
    height: "100%", // 100vh와 동일
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    }, //breackpoints 미디어 쿼리에서 화면 크기가 sm사이즈일 때 display none 사이드 바가 사라짐
    marginRight:"16px",
}))

const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    padding: "20px",
    marginBottom: "8px",
    marginRight: "8px",
    
    
}))

const NavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary
    },
    "&.active": {
        color: theme.palette.text.primary
    }
}))

const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                <ContentBox>
                    <NavList>
                        <StyledNavLink to={'/'}>
                            <HomeIcon />
                            <Typography variant='h2' fontWeight={700}>Home</Typography>
                        </StyledNavLink>
                        <StyledNavLink to={'/search'}>
                            <SearchIcon />
                            <Typography variant='h2' fontWeight={700}>Search</Typography>
                        </StyledNavLink>
                    </NavList>
                </ContentBox>
                <ContentBox height="100%">
                    <LibraryHead />
                    <Library />
                </ContentBox>
            </Sidebar>
            <ContentBox>
                <Navbar />
                <Outlet />
            </ContentBox>
            {/* 모바일 전용 Bottom Navigation */}
            <MobileBottomNav />
        </Layout>
    )
}
//outlet은 라우터에서 자식 컴포넌트들을 outlet에 넣어서 보여주는 느낌.
export default AppLayout