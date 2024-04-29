'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Layout, Col, Row, Modal, Button } from 'antd';

import '../../styles/home/homeStyles.scss';
import '../../styles/home/tableDeviceStyles.scss';
import TableDevice from './TableDevice';
import Loading from '@/app/loading';
import { WeatherProps } from '@/model/weather';
import DeviceControl from './Body/DeviceControl';

const { Content } = Layout;

const Chart = lazy(() => import('./Body/Chart'));
const Header = lazy(() => import('./Header'));
const WeatherForeCast = lazy(() => import('./Body/WeatherInformation'));

interface HomeProps {
  handleSetItemKeyProps: (value: any) => void;
}

const HomeContainer = ({ handleSetItemKeyProps }: HomeProps) => {
  const [weather, setWeather] = useState<WeatherProps>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [keyItem, setKeyItem] = useState<string>('3');
  const [data, setData] = useState<WeatherProps>({ temperature: 0, humidity: 0, light: 0, dobui: 0 });
  const aa = (value: any) => {
    setData(value);
  };
  const getWeather = (value: WeatherProps) => {
    setWeather(value);
  };

  const handleOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleSetItemKey = () => {
    setKeyItem('3');
    handleSetItemKeyProps(keyItem);
  };

  return (
    <Layout className='home__container'>
      <Content>
        <Suspense fallback={<Loading />}>
          <Row className='home__header__container'>
            <Header x={data} handleOpenModelProps={handleOpenModal} getWeather={getWeather} />
          </Row>
          <Row className='home__body__container'>
            <Col span={16} style={{ backgroundColor: 'var(--bgr-color-1)' }}>
              <Chart
                getData={aa}
                weatherInfo={weather ? weather : { temperature: 0, humidity: 0, light: 0, dobui: 0 }}
              />
              {/* <WeatherForeCast /> */}
            </Col>
            <Col span={8}>
              <DeviceControl x={data} getWeather={getWeather} />
            </Col>
          </Row>
          <Modal
            className='home__table_device_container'
            open={openModal}
            onCancel={handleCancelModal}
            title='Thông Tin Thiết Bị'
            footer={[
              <Button key='submit' onClick={handleCancelModal}>
                Hủy
              </Button>,
              <Button type='primary' key='submit' onClick={handleSetItemKey}>
                Bảng Điều Khiển
              </Button>,
            ]}
          >
            <TableDevice />
          </Modal>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default HomeContainer;
