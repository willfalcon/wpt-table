import React, { useContext, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SiteContext = React.createContext();

const SiteContextProvider = ({ data, children }) => {
  const { fields: savedFields, records: savedRecords } = data;

  const initialFields = savedFields.map(field => {
    const thing = field.meta_value;

    return {
      label: field.meta_value,
      id: field.meta_id,
      type: field.type,
    };
  });

  const initialRecords = savedRecords.filter(record => !record.subheading);
  const initialSubheading = savedRecords.filter(record => record.subheading)[0];

  const [fields, setFields] = useState(initialFields);
  const [records, setRecords] = useState(initialRecords);
  const [subheading, setSubheading] = useState(initialSubheading);

  return (
    <SiteContext.Provider value={{ ...data, fields, setFields, records, setRecords, subheading, setSubheading }}>
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider };
export default useSiteContext;
