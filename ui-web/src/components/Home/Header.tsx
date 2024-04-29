'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../../styles/home/headerStyles.scss';
import { WeatherProps } from '@/model/weather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { countHistory } from '@/redux/history/historyAction';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import axios from 'axios';

interface HeaderProps {
  getWeather: (value: any) => void;
  handleOpenModelProps: (value: any) => void;
  x: WeatherProps;
}

const Header = ({ getWeather, handleOpenModelProps, x }: HeaderProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get('http://localhost:5050/history/count');
        const data = res.data;
        setCount(data);
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setInterval(() => {
      fetchCount();
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const currentDay = moment().format('DD/MM/YYYY');
  const tempColor =
    x.temperature < 20
      ? '--temp-color-low'
      : x.temperature <= 25
      ? '--temp-color-safe'
      : x.temperature <= 34
      ? '--temp-color-medium'
      : '--temp-color-high';

  const humidityColor =
    x.humidity < 30
      ? '--humidity-color-low'
      : x.humidity <= 65
      ? '--humidity-color-safe'
      : x.humidity <= 80
      ? '--humidity-color-medium'
      : '--humidity-color-high';

  const humidityColors =
    x.humidity < 30
      ? '--humidity-color-low'
      : x.humidity <= 65
      ? '--humidity-color-safe'
      : x.humidity <= 80
      ? '--humidity-color-medium'
      : '--humidity-color-high';

  const lightColor =
    x.light / 10 < 102
      ? '--light-color-high'
      : x.light / 10 <= 90
      ? '--light-color-medium'
      : x.light / 10 <= 80
      ? '--light-color-safe'
      : '--light-color-low';

  return (
    <div className='header__container'>
      <div className='header_title' style={{ color: '#57C5B6' }}>
        IoT Dashboard Platform
      </div>
      <div className='header_time' style={{ color: '#569DAA' }}>
        Hôm nay là: {currentDay}
      </div>
      <div className='header_content'>
        <div className='weather--info temp' style={{ backgroundColor: `var(${tempColor})` }}>
          <div className='weather--info--details weather--info-temp'>
            <p>Nhiệt Độ</p>
            <div style={{ color: `#ffffff` }}>{x.temperature}°C</div>
          </div>
        </div>
        <div className='weather--info humidity' style={{ backgroundColor: `var(${humidityColor})` }}>
          <div className='weather--info--details weather--info-humidity'>
            <p>Độ ẩm</p>
            <div style={{ color: `#ffffff` }}>{x.humidity}%</div>
          </div>
        </div>
        <div className='weather--info humidity' style={{ backgroundColor: `var(${lightColor})` }}>
          <div className='weather--info--details weather--info-humidity'>
            <p>Ánh sáng</p>
            <div style={{ color: `#ffffff` }}>{Math.round(x.light / 10)} lux</div>
          </div>
        </div>
        <div className='weather--info humidity' style={{ backgroundColor: `var(${humidityColors})` }}>
          <div className='weather--info--details weather--info-humidity'>
            <p>Số lần</p>
            <div style={{ color: `#ffffff` }}>{count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
