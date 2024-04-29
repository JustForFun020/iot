'use client';

import React from 'react';
import { Layout } from 'antd';

import '../styles/headerGlobalStyles.scss';

interface HeaderGlobalProps {
  title: string;
  subtitle: string;
  bgrImg?: string;
}

const HeaderGlobal = ({ title, subtitle, bgrImg }: HeaderGlobalProps) => {
  const { Header } = Layout;

  return (
    <Header className='header__global__container' style={{ backgroundImage: `url(${bgrImg})` }}>
      <div>
        <div className='title'>{title}</div>
        <div className='subtitle'>{subtitle}</div>
      </div>
    </Header>
  );
};

export default HeaderGlobal;
