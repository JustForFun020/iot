'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Menu, type MenuProps, Layout } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ControlOutlined,
  ForkOutlined,
  DatabaseOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

import '../../styles/navbar.scss';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Sider, Content } = Layout;

interface UserNavBarProps {
  selectKey: string;
  handleCollapse: (value: boolean) => void;
  handleClickItem: (value: any) => void;
}

const NavBar: React.FC<UserNavBarProps> = ({ selectKey, handleCollapse, handleClickItem }: UserNavBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  };
  const route = useRouter();

  const handleClickCollapse = (value: boolean) => {
    handleCollapse(value);
  };

  const handleClick: MenuProps['onClick'] = (e) => {
    handleClickItem(e.key);
  };

  const items: MenuItem[] = [
    getItem('Trang Chủ', '1', <HomeOutlined />),
    getItem('Profile', '2', <UserOutlined />),
    // getItem('Bảng Điều Khiển', '3', <ControlOutlined />),
    getItem('Data Sensor', '4', <DatabaseOutlined />),
    getItem('Lịch sử', '5', <HistoryOutlined />),
  ];

  return (
    <Sider
      className='navbar__sider'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value), handleClickCollapse(value);
      }}
    >
      <div className='logo-vertical'>
        {collapsed ? (
          <img
            src='https://static.crozdesk.com/web_app_library/providers/logos/000/010/154/original/bevywise-iot-dashboard-1669212741-logo.png?1669212741'
            alt=''
            style={{ width: '20px' }}
          />
        ) : (
          'Iot Dashboard Platform'
        )}
      </div>
      <Menu
        items={items}
        triggerSubMenuAction='click'
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[selectKey]}
        selectedKeys={[selectKey]}
        inlineIndent={14}
        onClick={(e) => handleClick(e)}
        className='menu'
      />
    </Sider>
  );
};

export default NavBar;
