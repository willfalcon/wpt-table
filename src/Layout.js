import React from 'react';
import styled from 'styled-components';

import Headings from './Headings';
import TableRows from './TableRows';

const Layout = () => {
  return (
    <TableWrap>
      <Headings />
      <TableRows />
    </TableWrap>
  );
};

const TableWrap = styled.div`
  background: white;
  width: 100%;
`;

export default Layout;
