'use client';

import React from 'react';
import { Layout } from 'antd';
import { ConnectedProps, connect } from 'react-redux';

import IoTPlatFormContainer from '@/components';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchWeather } from '@/redux/weather/weatherAction';

interface IotPlatForm extends ReduxProps {}

const IoTPlatform = (props: IotPlatForm) => {
  return (
    <Layout>
      <IoTPlatFormContainer />
    </Layout>
  );
};

const mapStateToProps = (state: RootState): RootState => {
  return {
    weather: state.weather,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const locations = ['Ha Noi', 'Tokyo', 'Ottawa', 'Ho Chi Minh City', 'LonDon', 'Beijing'];
  return {
    fetchWeather: () => dispatch(fetchWeather({ locations }) as any),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(IoTPlatform);
