import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const CellInput = ({ type, className, value, onChange, name }) => {
  switch (type) {
    case 'text':
    case 'number':
    default:
      return <Input type={type} name={name} value={value} onChange={onChange} className={classNames(className, `input-type-${type}`)} />;
    case 'longText':
      return <TextArea name={name} value={value} onChange={onChange} className={classNames(className, `input-type-long-text`)} />;
  }
};

const Input = styled.input`
  &[type='number'],
  &[type='text'] {
    border-radius: 0;
    margin: 0;
    border: 0;
    width: 100%;
    padding: 10px 5px;
  }
`;

const TextArea = styled.textarea`
  border-radius: 0;
  margin: 0;
  border: 0;
  width: 100%;
  padding: 10px 5px;
`;

export default CellInput;
