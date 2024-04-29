'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { Image } from 'antd';
import { mqttClient } from '@/constance/mqtt';

import '../../../styles/body/deviceControlStyles.scss';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import { changeLedState, changeFanState } from '@/redux/control/reducer';

const DeviceControl = ({ getWeather, x }: any) => {
  const state = useAppSelector((state) => state.controlReducer);
  const [ledStateLocal, setLedStateLocal] = useState(state.ledState);
  const [fanStateLocal, setFanStateLocal] = useState(state.fanState);
  const dispatch = useAppDispatch();
  const [other, setOther] = useState(false);

  useEffect(() => {
    setLedStateLocal(localStorage.getItem('ledState') === 'true' ? true : false);
    setFanStateLocal(localStorage.getItem('fanState') === 'true' ? true : false);
  }, [state]);

  const { ledState, fanState } = state;

  const handleLed = () => {
    dispatch(changeLedState(!ledState));
    const newState = !ledState;
    mqttClient.publish('led-control', newState ? 'on-led' : 'off-led');
    localStorage.setItem('ledState', JSON.stringify(newState));
  };

  const handleFan = () => {
    dispatch(changeFanState(!fanState));
    const newState = !fanState;
    mqttClient.publish('fan-control', newState ? 'on-fan' : 'off-fan');
    localStorage.setItem('fanState', JSON.stringify(newState));
  };

  return (
    <div className='device__control__container'>
      <div className='title'>Điều khiển thiết bị</div>
      <div className='device_control'>
        <div className='leb--control control'>
          <div className='control--title'>Led Control</div>
          <div className='control-action'>
            <div className='action'>
              <p>On/Off: </p>
              <Switch onClick={handleLed} checked={ledStateLocal} />
              <div>
                {ledStateLocal ? (
                  <Image src='https://cdn-icons-png.flaticon.com/512/4020/4020112.png' width={70} />
                ) : (
                  <Image
                    src='https://cdn-icons-png.flaticon.com/512/2961/2961545.png?ga=GA1.1.645052442.1687856016'
                    width={70}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='fan--control control'>
          <div className='control--title'>Fan Control</div>
          <div className='control-action'>
            <div className='action'>
              <p>On/Off: </p>
              <Switch onClick={handleFan} checked={fanStateLocal} />
              <div>
                {fanStateLocal ? (
                  <Image src='https://cdn-icons-png.flaticon.com/512/545/545932.png' width={70} />
                ) : (
                  <Image src='https://cdn-icons-png.flaticon.com/512/4551/4551810.png' width={70} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='fan--control control'>
          <div className='control--title'>Other Control</div>
          <div className='control-action'>
            <div className='action'>
              <p>On/Off: </p>
              <Switch checked={!other} />
              <div>
                {!other ? (
                  <Image src='https://cdn-icons-png.flaticon.com/512/545/545932.png' width={70} />
                ) : (
                  <Image src='https://cdn-icons-png.flaticon.com/512/4551/4551810.png' width={70} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceControl;
