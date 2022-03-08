import React, { useEffect } from 'react';
import styled from 'styled-components';

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
      {fields.map(field => (
        <Heading key={field.id} field={field} />
      ))}
      <div className="heading add">
        <button className="add-column_button" onClick={newColumn}>
          +
        </button>
      </div>
    </StyledHeadings>
  );
};

const StyledHeadings = styled.div`
  display: flex;
`;
export default Headings;
