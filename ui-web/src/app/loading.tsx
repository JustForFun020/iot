'use client';

import React, { useState } from 'react';
import { Skeleton, Divider, Space, Layout, Row, Col } from 'antd';

import '../styles/loadingStyles.scss';

const Loading = () => {
  return (
    <Layout className='loading__container'>
      <Row className='loading__row '>
        <Skeleton paragraph={false} title={true} active />
      </Row>
      <Row className='loading__row '>
        <Col span={8}>
          <Skeleton.Button size='large' active />
          <Divider />
        </Col>
        <Col span={8}>
          <Skeleton.Button size='large' active />
          <Divider />
        </Col>
        <Col span={8}>
          <Skeleton.Button size='large' active />
          <Divider />
        </Col>
      </Row>
      <Row className='loading__row '>
        <Skeleton paragraph active />
      </Row>
    </Layout>
  );
};

export default Loading;
