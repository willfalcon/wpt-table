import React, { useContext, useState } from 'react';

const SiteContext = React.createContext();

const SiteContextProvider = ({ data, children }) => {
  const { fields: savedFields, records: savedRecords } = data;

  const initialFields = savedFields.map(field => ({
    label: field.meta_value,
    id: field.meta_id,
  }));

  const [fields, setFields] = useState(initialFields);
  const [records, setRecords] = useState(savedRecords);

  return <SiteContext.Provider value={{ ...data, fields, setFields, records, setRecords }}>{children}</SiteContext.Provider>;
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider };
export default useSiteContext;
