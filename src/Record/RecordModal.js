import React from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { BiSubdirectoryRight } from 'react-icons/bi';
import produce from 'immer';

import useSiteContext from '../SiteContext';

const RecordModal = ({ record, location, firstRow }) => {
  const { fields, postId, records, setRecords } = useSiteContext();
  console.log(record);
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

  const makeSubHeading = e => {
    e.preventDefault();
    console.log('make sub heading');
    wp.apiRequest({
      path: '/wp-table/v1/update-record',
      type: 'POST',
      data: {
        postId,
        record: record.id,
      },
    });
  };

  return (
    <Modal style={{ left: `${location[0]}px`, top: `${location[1]}px` }}>
      <button className="delete-field" onClick={deleteRecord}>
        <AiFillDelete />
        Delete Record
      </button>
      {firstRow && (
        <button className="make-sub-heading" onClick={makeSubHeading}>
          <BiSubdirectoryRight />
          Make Row Subheading
        </button>
      )}
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.dark};
  z-index: 1;
  /* display: flex;
  flex-direction: column;
  align-items: start; */
  button {
    color: white;

    background: ${({ theme }) => theme.dark};
    border: 0;
    padding: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
      background: ${({ theme }) => lighten(0.1, theme.dark)};
    }
    svg {
      margin-right: 5px;
    }
  }
`;
export default RecordModal;
