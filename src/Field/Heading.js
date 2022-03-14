import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AiFillCaretDown, AiOutlineConsoleSql } from 'react-icons/ai';
import produce from 'immer';

import useDebounce from '../lib/useDebounce';
import useSiteContext from '../SiteContext';
import useOnClickOutside from '../lib/useOnClickOutside';
import FieldSettings from './FieldSettings';
import FieldType from './FieldType';

const Heading = ({ field, primary }) => {
  const { postId, setFields, fields } = useSiteContext();

  const [value, setValue] = useState(field.label || '');
  const [type, setType] = useState(field.type || 'text');

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    async function save(value, type) {
      const res = await wp.apiRequest({
        path: '/wp-table/v1/save-field',
        type: 'POST',
        data: {
          value,
          metaID: field.id,
          postId,
          type,
        },
      });
    }
    save(debouncedValue, type);
  }, [debouncedValue, type]);

  const changeFieldType = e => {
    const type = e.target.value;

    setType(type);
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = e => {
    e.preventDefault();
    setSettingsOpen(!settingsOpen);
  };
  const headingRef = useRef();
  useOnClickOutside(headingRef, () => setSettingsOpen(false));
  return (
    <StyledHeading className="heading" primary={primary ? true : false} ref={headingRef}>
      <FieldType className="field-type-icon" type={type} />
      <input className="heading__input" value={value} onChange={e => setValue(e.target.value)} type="text" />
      <button className="heading__dropdown" onClick={toggleSettings}>
        <AiFillCaretDown />
      </button>
      {settingsOpen && <FieldSettings value={value} field={field} type={type} changeFieldType={changeFieldType} />}
    </StyledHeading>
  );
};

const StyledHeading = styled.div`
  border-top: 1px solid gray;
  border-left: 1px solid gray;

  display: flex;
  align-items: center;
  position: relative;
  &:last-child {
    border-right: 1px solid gray;
  }
  width: ${({ primary }) => (primary ? `${175 + 30}px` : '175px')};
  padding-left: ${({ primary }) => (primary ? '30px' : 0)};
  .field-type-icon {
    width: 30px;
    height: 30px;
    margin-left: 5px;
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
