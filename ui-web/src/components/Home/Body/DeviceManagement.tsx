import { useAppSelector } from '@/constance/hook';
import { TableDeviceProps } from '@/constance/tableDevice';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const DeviceManagement = () => {
  const ledState = useAppSelector((state) => state.controlReducer.state);

  const columns: ColumnsType<TableDeviceProps> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 400,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
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
  ];

  const data: TableDeviceProps[] = [
    {
      key: 'ID',
      name: 'Đèn Led Độ Ẩm',
      id: 'led_001',
      state: ledState,
    },
    {
      key: 'ID',
      name: 'Đèn Led Nhiệt Độ',
      id: 'led_002',
      state: ledState,
    },
  ];
  return (
    <div className='table__device__management'>
      <div className='title'>Thiết Bị Hiện Có</div>
      <Table className='table' scroll={{ y: 400 }} columns={columns} dataSource={data} />
    </div>
  );
};

export default DeviceManagement;
