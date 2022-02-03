import { Box } from '@mui/material';
import React from 'react';
import banner from '../static/banner.png';

const Header = () => (
  <Box
    sx={{
      maxWidth: '100vw',
      width: '100vw',
      border: '2px solid #59c',
      height: '110px',
      overflow: 'hidden',
      background: `center / cover no-repeat url(${banner})`,
      zIndex: 10,
      boxShadow: '0px 3px 5px #269',
    }}
    component="header"
    className="App-header"
  />
);

export default Header;
