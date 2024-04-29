'use client';

import React, { useState, lazy, Suspense, useEffect, useRef } from 'react';
import { Layout } from 'antd';
import NavBar from './Navbar/NavBar';

import '../styles/appStyle.scss';
import Loading from '@/app/loading';
import { delayImport } from '@/constance/delayImport';

const HomeContainer = lazy(() => delayImport(1000, () => import('./Home')));
const ProfileContainer = lazy(() => delayImport(3000, () => import('./Profile')));
const ControlContainer = lazy(() => delayImport(3000, () => import('./Control')));
const DataSensors = lazy(() => delayImport(3000, () => import('./DataSensor')));
const ControlHistory = lazy(() => delayImport(3000, () => import('./History')));

const IoTPlatFormContainer = () => {
  const [margin, setMargin] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('1');
  const [loading, setLoading] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const { Content } = Layout;

  const handleCollapse = (e: boolean) => {
    setMargin(e);
  };

  const handleClickItem = (e: any) => {
    setActiveItem(e);
  };

  const handleSetKey = (value: any) => {
    setActiveItem(value);
  };

  if (loading) {
    return (
      <Layout className='iot__platform__container'>
        <NavBar selectKey='1' handleCollapse={handleCollapse} handleClickItem={handleClickItem} />
        <Content className={margin ? 'iot__content ml-80' : 'iot__content ml-200'}>
          <Loading />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className='iot__platform__container'>
      <NavBar selectKey={activeItem} handleCollapse={handleCollapse} handleClickItem={handleClickItem} />
      <Content className={margin ? 'iot__content ml-80' : 'iot__content ml-200'}>
        <Suspense fallback={<Loading />}>
          {activeItem == '1' ? (
            <HomeContainer handleSetItemKeyProps={handleSetKey} />
          ) : activeItem == '3' ? (
            <ControlContainer />
          ) : activeItem == '2' ? (
            <ProfileContainer />
          ) : activeItem == '4' ? (
            <DataSensors />
          ) : (
            <ControlHistory />
          )}
        </Suspense>
      </Content>
    </Layout>
  );
};

export default IoTPlatFormContainer;
