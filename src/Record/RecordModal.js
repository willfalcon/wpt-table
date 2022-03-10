import React from 'react';

import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import produce from 'immer';

import useSiteContext from '../SiteContext';

const RecordModal = ({ record, location }) => {
  const { fields, postId, records, setRecords } = useSiteContext();

  const deleteRecord = e => {
    e.preventDefault();
    wp.apiRequest({
      path: '/wp-table/v1/delete-record',
      type: 'POST',
      data: {
        postId,
        record: record.id,
      },
    });

    const newRecords = produce(records, draft => {
      const index = draft.findIndex(rec => rec.id === record.id);
      draft.splice(index, 1);
    });
    setRecords(newRecords);
  };

  return (
    <Modal style={{ left: `${location[0]}px`, top: `${location[1]}px` }}>
      <button className="delete-field" onClick={deleteRecord}>
        Delete Record
        <AiFillDelete />
      </button>
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.dark};
  z-index: 1;
  .delete-field {
    color: white;
    background: transparent;
    border: 0;
    padding: 5px 10px;
  }
`;
export default RecordModal;
