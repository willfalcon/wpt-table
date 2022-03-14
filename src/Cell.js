import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useDebounce from './lib/useDebounce';
import useSiteContext from './SiteContext';
import CellInput from './CellInput';

const Cell = ({ field, record, primary, index, cellIndex, subheading }) => {
  const thisCell = record.fields[record.fields.findIndex(refField => refField.key === `wpt_${record.id}_${field.id}`)];

  const [value, setValue] = useState(thisCell?.value[0] || '');

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
    <StyledCell className="cell" primary={primary ? true : false} data-cell-index={cellIndex}>
      {primary && <span className="cell__index">{index}</span>}
      <CellInput name={field.label} type={subheading ? 'text' : field.type} value={value} onChange={e => setValue(e.target.value)} />
    </StyledCell>
  );
};

const StyledCell = styled.div`
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  width: ${({ primary }) => (primary ? `${175 + 30}px` : '175px')};

  &:last-child {
    border-right: 1px solid gray;
  }

  padding-left: ${({ primary }) => (primary ? '30px' : 0)};

  .cell {
    &__index {
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
    }
  }

  input {
  }
`;

export default Cell;
