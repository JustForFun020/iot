'use client';

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { Layout, Table, InputRef, Button, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import { AppDispatch, RootState } from '@/redux/store';

import '../../styles/dataSensorStyles.scss';
import { fetchDHT11 } from '@/redux/dht11/dht11Action';

interface DataType {
  key: React.Key;
  stt: number;
  id: string;
  name: string;
  temp: string;
  hum: string;
  light: string;
  time: string;
}

type DataIndex = keyof DataType;

const DataSensors = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchShow, setSearchShow] = useState(false);
  const [showInputSearch, setShowInputSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchArr, setSearchArr] = useState<any>([]);
  const [typeData, setTypeData] = useState('');
  const searchInput = useRef<InputRef>(null);

  const state = useAppSelector((state: RootState) => state.dht11Reducer);
  const dispatch: AppDispatch = useAppDispatch();

  const { Search } = Input;
  const { Header, Content } = Layout;
  const { dht11 } = state;

  useEffect(() => {
    dispatch(fetchDHT11('sensor') as any);
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

  const handleClickListSearch = (value: string) => {
    setShowInputSearch(true);
    setSearchShow(false);
    if (value === 'temp') {
      setPlaceholder('Tìm kiếm theo Nhiệt độ');
    } else if (value === 'hum') {
      setPlaceholder('Tìm kiếm theo Độ ẩm');
    } else {
      setPlaceholder('Tìm kiếm theo Ánh sáng');
    }
  };

  const handleClickReset = () => {
    setShowInputSearch(false);
    setTypeData('');
    setSearchValue('');
  };

  const handleClickSearch = () => {
    setTypeData('search');
    if (placeholder.includes('Nhiệt độ')) {
      setSearchArr(_.filter(dht11, (item: any) => JSON.parse(item.message).temperature == searchValue));
    } else if (placeholder.includes('Độ ẩm')) {
      setSearchArr(_.filter(dht11, (item: any) => JSON.parse(item.message).humidity == searchValue));
    } else {
      setSearchArr(_.filter(dht11, (item: any) => JSON.parse(item.message).light == searchValue));
    }
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

  const formattedData =
    dht11 && typeData === ''
      ? dht11.map((item: any, index: number) => ({
          stt: index + 1,
          id: item._id,
          name: item.topic == 'iotData' ? 'DHT11' : item.message.includes('led') ? 'Led' : 'Fan',
          temp: JSON.parse(item.message).temperature,
          hum: JSON.parse(item.message).humidity,
          light: JSON.parse(item.message).light,
          dobui: JSON.parse(item.message).dobui,
          time: item.time,
        }))
      : dht11 && typeData === 'search'
      ? searchArr.map((item: any, index: number) => ({
          stt: index + 1,
          id: item._id,
          name: item.topic == 'iotData' ? 'DHT11' : item.message.includes('led') ? 'Led' : 'Fan',
          temp: JSON.parse(item.message).temperature,
          hum: JSON.parse(item.message).humidity,
          light: JSON.parse(item.message).light,
          time: item.time,
        }))
      : [];
  const columns: ColumnsType<any> = [
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
      width: 180,
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      width: 120,
      filters: [
        {
          text: 'DHT11',
          value: 'DHT11',
        },
      ],
      onFilter: (value, record) => {
        return record.name.indexOf(value) === 0;
      },
    },
    {
      title: 'Nhiệt độ',
      dataIndex: 'temp',
      align: 'center',
      key: 'temp',
      width: 120,
      sorter: (a, b) => {
        return a.temp - b.temp;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Độ ẩm',
      dataIndex: 'hum',
      align: 'center',
      key: 'hum',
      width: 120,
      sorter: (a, b) => {
        return a.hum - b.hum;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Ánh Sáng',
      dataIndex: 'light',
      align: 'center',
      key: 'light',
      width: 120,
      sorter: (a, b) => {
        return a.light - b.light;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Độ bụi',
      dataIndex: 'dobui',
      align: 'center',
      key: 'light',
      width: 120,
      sorter: (a, b) => {
        return a.light - b.light;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
      width: 120,
      sorter: (a, b) => a.stt - b.stt,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  return (
    <Layout className='data__sensor__container'>
      <Header className='header'>
        <div className='title'>Data Sensors</div>
        <div className='sub-title'>
          <i>Theo dõi quá trình chuyển đổi trang thái ở đây!!</i>
        </div>
      </Header>
      <div className='search__sensor'>
        <Button onClick={() => setSearchShow(!searchShow)} className=''>
          Tìm Kiếm
        </Button>
        <ul style={searchShow ? { display: 'inline-block' } : { display: 'none' }} className='search_list'>
          <li onClick={() => handleClickListSearch('temp')}>Nhiệt độ</li>
          <li onClick={() => handleClickListSearch('hum')}>Độ ẩm</li>
          <li onClick={() => handleClickListSearch('light')}>Ánh sáng</li>
        </ul>
        <div className='search__input' style={showInputSearch ? { display: 'flex' } : { display: 'none' }}>
          <Search
            onSearch={handleClickSearch}
            width={150}
            enterButton
            placeholder={placeholder}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button onClick={handleClickReset}>Reset</Button>
        </div>
      </div>
      <Content className='content'>
        <Table
          className='data__sensor__table'
          columns={columns}
          dataSource={formattedData}
          scroll={{ y: 550 }}
          pagination={{ pageSize: 20 }}
          locale={{ emptyText: state.loading ? <LoadingOutlined spin style={{ fontSize: 30 }} /> : 'No data' }}
        />
      </Content>
    </Layout>
  );
};

export default DataSensors;
