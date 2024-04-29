'use client';

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { Layout, Table, InputRef, Button, Space, Input, Tag } from 'antd';
import type { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import '../../styles/historyStyles.scss';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import { fetchHistory } from '@/redux/history/historyAction';

interface DataType {
  key: React.Key;
  stt: number;
  id: string;
  name: string;
  state: string;
  time: string;
}

type DataIndex = keyof DataType;

const ControlHistory = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [typeSearch, setTypeSearch] = useState<boolean>(false);
  const [searchArr, setSearchArr] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchInput = useRef<InputRef>(null);

  const state = useAppSelector((state) => state.historyReducer);
  const dispatch = useAppDispatch();

  const { Search } = Input;
  const { Content, Header } = Layout;
  const { history } = state;

  useEffect(() => {
    dispatch(fetchHistory('history') as any);
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleClickReset = () => {
    setTypeSearch(false);
    setSearchValue('');
  };

  const handleClickSearch = () => {
    setTypeSearch(true);
    setSearchArr(_.filter(history, (item: any) => item.time == searchValue));
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const dataSource: any =
    history && !typeSearch
      ? history.map((item: any, index) => ({
          stt: index + 1,
          id: item._id,
          name: item.name,
          state: item.state.split('-')[0],
          time: item.time,
        }))
      : history && typeSearch
      ? searchArr.map((item: any, index: any) => ({
          stt: index + 1,
          id: item._id,
          name: item.name,
          state: item.state.split('-')[0],
          time: item.time,
        }))
      : [];

  const columns: any = [
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
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Trang thái',
      dataIndex: 'state',
      align: 'center',
      key: 'state',
      ...getColumnSearchProps('state'),
      render: (state: string) => {
        const newText = state.toLocaleUpperCase();
        const colorState = state.includes('off') ? 'red' : 'green';
        return (
          <Tag style={{ textAlign: 'center' }} color={colorState}>
            <span style={{ color: `${colorState}`, textAlign: 'center' }}>{newText}</span>
          </Tag>
        );
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
      width: 250,
      sorter: (a: any, b: any) => a.stt - b.stt,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  return (
    <Layout className='history__container'>
      <Header className='header'>
        <div className='title'>Lịch Sử Điều Khiển</div>
        <div className='sub-title'>
          <i>Xem thông tin về các lần chuyển đổi, chình sử thiết bị của bạn tại đây!</i>
        </div>
      </Header>
      <Content className='content'>
        <div className='history__search'>
          <Search
            onSearch={handleClickSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder='Tìm kiếm theo thời gian'
            enterButton
          />
          <Button onClick={handleClickReset}>Reset</Button>
        </div>
        <Table
          className='history__table'
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 550 }}
          pagination={{ pageSize: 20 }}
          locale={{ emptyText: state.loading ? <LoadingOutlined spin style={{ fontSize: 30 }} /> : 'No data' }}
        />
      </Content>
    </Layout>
  );
};

export default ControlHistory;
