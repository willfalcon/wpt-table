import React from 'react';
import { IoText } from 'react-icons/io5';
import { AiOutlineNumber } from 'react-icons/ai';
import { BsTextParagraph } from 'react-icons/bs';

import classNames from 'classnames';
const FieldType = ({ type, className }) => {
  switch (type) {
    case 'text':
    default:
      return <IoText className={classNames(className, 'type-text')} />;
    case 'number':
      return <AiOutlineNumber className={classNames(className, 'type-number')} />;
    case 'longText':
      return <BsTextParagraph className={classNames(className, 'type-long-text')} />;
  }
};

export default FieldType;
