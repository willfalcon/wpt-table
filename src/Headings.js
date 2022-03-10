import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

import useSiteContext from './SiteContext';
import useDebounce from './lib/useDebounce';
import Heading from './Heading';

const Headings = () => {
  const { fields, postId, setFields } = useSiteContext();
  console.log({ fields });
  function newColumn(e) {
    e.preventDefault();
    wp.apiRequest({
      path: '/wp-table/v1/new-field',
      type: 'POST',
      data: {
        postId,
        metaKey: 'wpt_field_name',
        value: '',
        type: 'text',
      },
    })
      .then(res => {
        setFields([
          ...fields,
          {
            id: res,
            label: '',
          },
        ]);
      })
      .catch(err => {
        console.error('something went wrong: ', err);
      });
  }

  return (
    <StyledHeadings className="headings">
      {fields.map((field, index) => (
        <Heading key={field.id} primary={index === 0} field={field} />
      ))}
      <AddField className="heading add">
        <button className="add-column_button" onClick={newColumn}>
          <AiOutlinePlus />
        </button>
      </AddField>
    </StyledHeadings>
  );
};

const AddField = styled.div`
  width: 50px;
  border: 1px solid gray;
  button {
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
const StyledHeadings = styled.div`
  display: flex;
`;
export default Headings;
