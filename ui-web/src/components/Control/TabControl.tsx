'use client';

import React, { useEffect, useState } from 'react';
import { Divider, Layout } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import { mqttClient } from '@/constance/mqtt';

import '../../styles/control/tabControlStyles.scss';
import { changeLedState } from '@/redux/control/reducer';

interface TabControlProps {
  handleShowProps: (value: any) => void;
}

const TabControl = ({ handleShowProps }: TabControlProps) => {
  const [onShow, setOnShow] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<any>(false);

  const dispatch = useAppDispatch();
  const stateControl = useAppSelector((state) => state.controlReducer);

  useEffect(() => {
    console.log(toggleState);
    console.log(stateControl);
  }, []);

  const handleClose = (e: any) => {
    e.preventDefault();
    setOnShow(false);
    handleShowProps(onShow);
  };

  const handleToggleState = () => {
    setToggleState(!toggleState);
    toggleState ? dispatch(changeLedState(false)) : dispatch(changeLedState(true));
    console.log(toggleState);
    console.log(stateControl);
  };

  return (
    <div className='tab__control__container'>
      <div className='close-icon' onClick={handleClose}>
        <CloseOutlined />
      </div>
      <div className='title'>Tab Điều Khiển</div>
      <Divider style={{ backgroundColor: '#fff' }} />
      <ul className='list-control'>
        <li>
          Bật / Tắt:{' '}
          <div
            className='toggle-btn'
            onClick={() => {
              handleToggleState();
            }}
            style={toggleState ? { backgroundColor: 'var(--state-on)' } : { backgroundColor: 'var(--state-off)' }}
          >
            <div className='circle' style={toggleState ? { float: 'right' } : { float: 'left' }}></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TabControl;
