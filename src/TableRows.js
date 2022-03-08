import React, { useState } from 'react';
import styled from 'styled-components';

import Record from './Record';

import useSiteContext from './SiteContext';

const TableRows = () => {
  const { records, postId, setRecords } = useSiteContext();

  const addRecord = e => {
    e.preventDefault();
    wp.apiRequest({
      path: '/wp-table/v1/add-record',
      type: 'POST',
      data: {
        postId,
      },
    }).then(res => {
      setRecords([
        ...records,
        {
          id: res,
          fields: [],
        },
      ]);
    });
  };

  return (
    <StyledRows>
      {records.map(record => (
        <Record key={record.id} record={record} />
      ))}
      <button onClick={addRecord}>+</button>
    </StyledRows>
  );
};

const StyledRows = styled.div`
  .row {
    display: flex;
    &:last-child {
      .cell {
        border-bottom: 1px solid gray;
      }
    }
  }
`;
export default TableRows;
