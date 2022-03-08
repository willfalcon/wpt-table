import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { SiteContextProvider } from './SiteContext';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Layout from './Layout';

const App = ({ postId, fields, records }) => {
  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ postId, fields, records }}>
        <AppWrapper>
          <Layout />
          <GlobalStyles />
        </AppWrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const AppWrapper = styled.div`
  box-sizing: border-box;

  -ms-overflow-style: -ms-autohiding-scrollbar;
  scroll-behavior: smooth;
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export default App;
