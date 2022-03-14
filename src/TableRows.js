import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

import Record from './Record/Record';

import useSiteContext from './SiteContext';

const TableRows = () => {
  const { records, postId, setRecords, subheading } = useSiteContext();

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
    <StyledRows className="records-list">
      {subheading && <Record subheading record={subheading} />}
      {records.map((record, index) => (
        <Record key={record.id} index={index + 1} record={record} />
      ))}
      <button className="add-record" onClick={addRecord}>
        <AiOutlinePlus />
      </button>
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
  .add-record {
    height: 20px;
    width: 20px;
    background: transparent;
    border: 0;
  }
`;
export default TableRows;
