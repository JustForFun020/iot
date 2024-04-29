'use client';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/constance/hook';
import { fetchWeather } from '@/redux/weather/weatherAction';
import { Button, Divider, Image as AntdImg, Modal } from 'antd';

import '../../../styles/body/weatherStyles.scss';

const WeatherInformation = () => {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>('');

  const { loading, weather, error } = weatherState;

  useEffect(() => {
    const locations = ['Ha Noi', 'Ho Chi Minh city', 'Tokyo', 'Beijing'];
    dispatch(fetchWeather({ locations: locations }) as any);
  }, []);

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleShowDetailsWeather = (location: any) => {
    setOpenModal(true);
    setCityName(location.name);
  };

  const cityImage = (name: string) => {
    if (name === 'Ha Noi') {
      return 'https://i.pinimg.com/564x/96/4e/b1/964eb1d3180dde6605fa9c4fe7e40fac.jpg';
    } else if (name === 'Ho Chi Minh City') {
      return 'https://i.pinimg.com/564x/72/3a/4d/723a4dd457a76a4263a778d08d26b06c.jpg';
    } else if (name === 'Tokyo') {
      return 'https://i.pinimg.com/564x/bd/d7/21/bdd72107369b17d007f4f4f186f185c7.jpg';
    } else {
      return 'https://i.pinimg.com/564x/9b/91/a4/9b91a4d6d34becd79931aa2684bf0122.jpg';
    }
  };

  return (
    <div className='weather__info_container'>
      <div className='weather__info_title'>Thông tin thời tiết</div>
      <Divider />
      {weather ? (
        <div className='weather__info_content'>
          {_.map(weather, (item) => {
            const location = _.get(item, 'location');
            const currentWeather = _.get(item, 'current');
            return (
              <div className='weather__info-details'>
                <div className='weather-info-location'>{location.name}</div>
                <AntdImg className='weather-icon' src={currentWeather.condition.icon} />
                <div className='weather-info-report'>
                  <p className='temp--info'>
                    Nhiệt Độ: <i>{currentWeather.temp_c}°C</i>
                  </p>
                  <p className='humidity--info'>
                    Độ ẩm: <i>{currentWeather.humidity}%</i>
                  </p>
                  <p className='uv--info'>
                    UV: <i>{currentWeather.uv}</i>{' '}
                  </p>
                  <Button
                    onClick={() => handleShowDetailsWeather(location)}
                    type='primary'
                    className='btn_show-details-weather'
                  >
                    Xem chi tiết
                  </Button>
                </div>
                {location.name === cityName && (
                  <Modal
                    open={openModal}
                    footer={[<Button onClick={handleCancelModal}>Cancel</Button>]}
                    onCancel={handleCancelModal}
                    className='detail--weather'
                  >
                    <p>Thời tiết thành phố: {location.name}</p>
                    <Divider style={{ marginBottom: 35, backgroundColor: '#333' }} />
                    <div
                      style={{
                        background: `url(${cityImage(location.name)}) no-repeat`,
                      }}
                      className='content'
                    >
                      <AntdImg className='weather-icon' src={currentWeather.condition.icon} />
                      <ul className='weather'>
                        <li>
                          Nhiệt Độ: <i>{currentWeather.temp_c}°C</i>
                        </li>
                        <li>
                          Độ Ẩm: <i>{currentWeather.humidity}%</i>
                        </li>
                        <li>
                          UV: <i>{currentWeather.uv}</i>
                        </li>
                        <li>
                          Tốc Độ Gió: <i>{currentWeather.wind_mph} mph</i>
                        </li>
                        <li>
                          Hướng Gió: <i>{currentWeather.wind_degree} độ</i>
                        </li>
                        <li>
                          Mây: <i>{currentWeather.cloud}%</i>
                        </li>
                        <li>
                          Mô tả: <i>{currentWeather.condition.text}</i>
                        </li>
                      </ul>
                    </div>
                  </Modal>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

export default WeatherInformation;
