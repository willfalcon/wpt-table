import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import useSiteContext from '../SiteContext';
import Cell from '../Cell';
import RecordModal from './RecordModal';
import useOnClickOutside from '../lib/useOnClickOutside';

const Record = ({ record, index: recordIndex }) => {
  const { fields } = useSiteContext();
  const rowRef = useRef();
  const [rowSettings, toggleRowSettings] = useState(false);
  const [clickLocation, setClickLocation] = useState([null, null]);

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.addEventListener('mousedown', e => {
        if (e.button === 2) {
          toggleRowSettings(true);

          let startingWidth = 0;
          if ('cellIndex' in e.target.parentNode.dataset) {
            startingWidth = 175 * parseInt(e.target.parentNode.dataset.cellIndex);
          }
          // console.log([e.offsetX, e.offsetY]);
          setClickLocation([startingWidth + e.offsetX, e.offsetY]);
        }
      });
    }
  }, [rowRef.current]);

  useOnClickOutside(rowRef, () => toggleRowSettings(false));

  return (
    <StyledRecord className="row" ref={rowRef} onContextMenu={e => e.preventDefault()} data-record>
      {fields.map((field, index) => {
        return <Cell key={field.id} index={recordIndex} primary={index === 0} cellIndex={index} record={record} field={field} />;
      })}
      {rowSettings && <RecordModal location={clickLocation} record={record} toggleRowSettings={toggleRowSettings} />}
    </StyledRecord>
  );
};

const StyledRecord = styled.div`
  position: relative;
`;

export default Record;
