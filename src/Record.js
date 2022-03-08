import React from 'react';
import useSiteContext from './SiteContext';
import Cell from './Cell';

const Record = ({ record }) => {
  const { fields } = useSiteContext();
  return (
    <div className="blank-row row">
      {fields.map(field => {
        return <Cell key={field.id} record={record} field={field} />;
      })}
    </div>
  );
};

export default Record;
