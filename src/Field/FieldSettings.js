import React, { useEffect, useState, useRef } from 'react';
import { lighten } from 'polished';
import produce from 'immer';
import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';

import useSiteContext from '../SiteContext';
import fieldTypes from './fieldTypes';

const FieldSettings = ({ field, value, type, changeFieldType }) => {
  const [fieldTypeModal, setFieldTypeModal] = useState(false);

  const { postId, setFields, fields } = useSiteContext();
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
          type,
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

  const openFieldTypeModal = e => {
    e.preventDefault();
    setFieldTypeModal(true);
  };

  return (
    <>
      <Modal className="field-modal">
        <button className="change-field-type" onClick={openFieldTypeModal}>
          <MdCategory />
          Change Field Type
        </button>
        <button className="delete-field" onClick={deleteField}>
          <AiFillDelete />
          Delete Field
        </button>
      </Modal>
      {fieldTypeModal && (
        <Modal className="field-type-modal">
          <select className="field-type-select" value={type} onChange={changeFieldType}>
            {fieldTypes.map(({ type, label }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </Modal>
      )}
    </>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.dark};
  z-index: 1;
  * {
    color: white;
  }
  &.field-type-modal {
    z-index: 2;
    width: 200px;
  }
  button {
    background: ${({ theme }) => theme.dark};

    width: 100%;
    border: 0;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    &:hover {
      background: ${({ theme }) => lighten(0.1, theme.dark)};
    }
    svg {
      margin-right: 5px;
    }
  }
`;
export default FieldSettings;
