import React from 'react';

const { useEffect, useState } = wp.element;
const { apiFetch } = wp;
const { SelectControl } = wp.components;

const TableEdit = ({ attributes, setAttributes }) => {
  const [tables, setTables] = useState([]);
  console.log(tables);
  useEffect(() => {
    apiFetch({
      path: '/wp/v2/wpt-table',
    }).then(res => {
      setTables(res);
    });
  }, []);
  const { table } = attributes;
  return (
    <div>
      <SelectControl
        label="Table"
        value={table ? table : null}
        onChange={table => setAttributes({ table })}
        options={[
          { value: 'none', label: 'Select a Table' },
          ...tables.map(table => ({
            value: table.id,
            label: table.title.rendered,
          })),
        ]}
      />
    </div>
  );
};

export default TableEdit;
