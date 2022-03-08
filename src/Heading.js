import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillCaretDown, AiFillDelete } from 'react-icons/ai';
import produce from 'immer';

import useDebounce from './lib/useDebounce';
import useSiteContext from './SiteContext';

const Heading = ({ field }) => {
  const { postId, setFields, fields } = useSiteContext();

  const [value, setValue] = useState(field.label || '');
  const [type, setType] = useState('text');

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    async function save(value) {
      const res = await wp.apiRequest({
        path: '/wp-table/v1/save-heading',
        type: 'POST',
        data: {
          value,
          metaID: field.id,
          postId,
        },
      });
      console.log(res);
    }
    save(debouncedValue);
  }, [debouncedValue]);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = e => {
    e.preventDefault();
    setSettingsOpen(!settingsOpen);
  };

  const deleteField = e => {
    e.preventDefault();
    async function deleteTheField() {
      const res = await wp.apiRequest({
        path: '/wp-table/v1/delete-field',
        type: 'POST',
        data: {
          metaID: field.id,
          postId,
          value,
        },
      });
    }

    deleteTheField();

    const newFields = produce(fields, draft => {
      const index = draft.findIndex(field => field.label === value);
      draft.splice(index, 1);
    });
    setFields(newFields);
  };

  return (
    <StyledHeading className="heading">
      <input className="heading__input" value={value} onChange={e => setValue(e.target.value)} type="text" />
      <button className="heading__dropdown" onClick={toggleSettings}>
        <AiFillCaretDown />
      </button>
      {settingsOpen && (
        <Modal className="field-modal">
          <button className="delete-field" onClick={deleteField}>
            Delete Field
            <AiFillDelete />
          </button>
        </Modal>
      )}
    </StyledHeading>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.dark};
  button {
    background: transparent;
    border: 0;
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const StyledHeading = styled.div`
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  width: 175px;
  display: flex;
  position: relative;
  &:last-child {
    border-right: 1px solid gray;
  }

  .heading {
    &__input {
      border-radius: 0;
      margin: 0;
      border: 0;
      width: 100%;
      padding: 10px 5px;
    }
    &__dropdown {
      background: transparent;
      border: 0;
    }
  }
`;

export default Heading;
