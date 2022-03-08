import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useDebounce from './lib/useDebounce';
import useSiteContext from './SiteContext';

const Cell = ({ field, record }) => {
  const thisCell = record.fields[record.fields.findIndex(refField => refField.key === `wpt_${record.id}_${field.id}`)];

  const [value, setValue] = useState(thisCell?.value || '');

  const debouncedValue = useDebounce(value, 500);

  const { postId } = useSiteContext();

  const metaKey = `wpt_${record.id}_${field.id}`;

  useEffect(() => {
    async function save(value) {
      wp.apiRequest({
        path: '/wp-table/v1/save-cell',
        type: 'POST',
        data: {
          value,
          metaKey,
          postId,
        },
      }).then(res => {
        // console.log(res);
      });
    }

    save(debouncedValue);
  }, [debouncedValue]);

  return (
    <StyledCell className="cell blank-cell">
      <input name={field.label} type="text" value={value} onChange={e => setValue(e.target.value)} />
    </StyledCell>
  );
};

const StyledCell = styled.div`
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  width: 175px;

  &:last-child {
    border-right: 1px solid gray;
  }

  input {
    border-radius: 0;
    margin: 0;
    border: 0;
    width: 100%;
    padding: 10px 5px;
  }
`;

export default Cell;
