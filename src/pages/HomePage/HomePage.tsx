import React from 'react'
import NewReleases from './components/NewReleases'
import Tracks from './components/Tracks'
import Albums from './components/Albums'
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const SearchContainer = styled(Box)({ // 스크롤 디자인 
  padding: "16px", 
  paddingBottom: "43px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
      display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});

const HomePage = () => {
  return (
    <SearchContainer>
      <NewReleases/>
      <Tracks/>
      <Albums/>
    </SearchContainer>
    
  )
}

export default HomePage