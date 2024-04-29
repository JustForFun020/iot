'use client';

import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table, Tag } from 'antd';

import '../../styles/home/tableDeviceStyles.scss';
import { TableDeviceProps } from '@/model/tableDevice';

const TableDevice = () => {
  const dataSource: TableDeviceProps[] = [
    {
      stt: 1,
      key: '1',
      id: 'led_001',
      name: 'Đèn Leb Độ Ẩm',
      state: 'off',
      note: 'No Data',
    },
    {
      stt: 2,
      key: 'ID',
      name: 'Đèn Led Nhiệt Độ',
      id: 'led_002',
      state: 'on',
      note: 'No Data',
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
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
      key: 'note',
      width: 250,
    },
  ];
  return (
    <div className='table__device__container'>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 300 }} />
    </div>
  );
};

export default TableDevice;
