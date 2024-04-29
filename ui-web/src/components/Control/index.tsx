'use client';

import React, { useState } from 'react';
import { Layout, Tag, Table, Button } from 'antd';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';

import '../../styles/control/controllerStyles.scss';
import { TableDeviceProps } from '@/model/tableDevice';
import TabControl from './TabControl';
import { useAppSelector } from '@/constance/hook';

const ControlContainer = () => {
  const [tabControl, setTabControl] = useState<boolean>(false);
  const ledState = useAppSelector((state: any) => state.controlReducer.state);

  const { Content, Header, Footer } = Layout;

  const currentDay = moment().format('HH:mm DD/MM/YYYY');
  const dataSource: TableDeviceProps[] = [
    {
      stt: 1,
      key: '1',
      id: 'led_001',
      name: 'Đèn Leb Độ Ẩm',
      state: ledState,
      date: currentDay,
      note: 'No Data No Data No Data No Data No Data',
      control: 'button',
    },
    {
      stt: 2,
      key: 'ID',
      name: 'Đèn Led Nhiệt Độ',
      id: 'led_002',
      state: ledState,
      note: 'No Data',
      control: 'button',
    },
  ];

  const columns: ColumnsType<TableDeviceProps> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      key: 'stt',
      width: 80,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: 'Trang thái',
      dataIndex: 'state',
      align: 'center',
      key: 'state',
      render: (state: string) => {
        const newText = state.toLocaleUpperCase();
        const colorState = state === 'off' ? 'red' : 'green';
        return (
          <Tag style={{ textAlign: 'center' }} color={colorState}>
            <span style={{ color: `${colorState}`, textAlign: 'center' }}>{newText}</span>
          </Tag>
        );
      },
    },
    {
      title: 'Ngày sử dụng gần nhất',
      dataIndex: 'data',
      align: 'center',
      key: 'data',
      render: () => {
        return <span>{currentDay}</span>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
      key: 'note',
      width: 250,
    },
    {
      title: 'Điều khiển thiết bị',
      dataIndex: 'control',
      align: 'center',
      key: 'control',
      render: (text) => {
        if (text === 'button') {
          return (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setTabControl(true);
              }}
            >
              Điều khiển{' '}
            </Button>
          );
        }
      },
    },
  ];

  const onCloseTab = (value: any) => {
    setTabControl(value);
  };

  return (
    <Layout className='control__container'>
      <Header className='control__header'>
        <div className='title'>Bảng Điều Khiển</div>
        <div className='sub--title'>Theo dõi, điều khiển, quản lý thiết bị điện tử của bạn bằng Bảng điều khiển</div>
      </Header>
      <Content className='control__content'>
        <Table scroll={{ y: 320 }} className='table' columns={columns} dataSource={dataSource} />
        {tabControl && <TabControl handleShowProps={onCloseTab} />}
      </Content>
      <Footer className='control__footer'>©Copyright By Me!</Footer>
    </Layout>
  );
};

export default ControlContainer;
