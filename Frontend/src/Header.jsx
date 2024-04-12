import React from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import logo from './drive-view.png'; 

const Logo = styled.img`
  height: 50px; // Set the height as needed
  margin-right: 20px;
`;

const HeaderBar = styled(AppBar)`
  margin-bottom: 30px;
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

function Header() {
  return (
    <HeaderBar position="static">
      <Toolbar>
        <Logo src={logo} alt="Drive Viewer Logo" />
        <Title variant="h6">
          Drive Viewer
        </Title>
      </Toolbar>
    </HeaderBar>
  );
}

export default Header;
