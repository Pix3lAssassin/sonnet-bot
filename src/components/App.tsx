import React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Routes, Route } from 'react-router';
import Header from './Header';
import Body from './Body';

declare module '@mui/material/styles' {
  export interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
  }
}

const App = () => {
  const theme = createTheme({
    palette: {
      primary: indigo,
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 500,
        desktop: 1024,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="App"
      >
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/:seed" element={<Body />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
