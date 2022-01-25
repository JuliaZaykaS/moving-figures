import s from './Title.module.css'

import React from 'react';

export const Title = ({title, children}) => {
  return <h2 className={s.title}>{title}
      {children}
  </h2>;
};
