'use client';

import React, { useState } from 'react';
import { Layout, Form, Row, Input, Divider } from 'antd';

import '../../styles/profileStyles.scss';
import HeaderGlobal from '@/app/header';
import { MyProfile } from '@/model/profile';

const ProfileContainer = () => {
  const [profile, setProfile] = useState<MyProfile>({
    fullName: 'Hoàng Trung Trường',
    studentId: 'B20DCCN706',
    fieldStudy: 'Công nghệ thông tin',
    major: 'Hệ thống thông tin',
    email: 'truonght.b20cn706@stu.ptit.edu.vn',
    address: 'Nghệ An',
    classID: 'HTTT06',
    skype: '',
    phoneNumber: '',
    date: '',
  });

  const { Item } = Form;
  const { Header, Content } = Layout;

  return (
    <Layout className='profile__container'>
      <HeaderGlobal
        title='Thông Tin Cá Nhân'
        subtitle='Quản lý, chỉnh sửa, thay đổi thông tin cá nhân của bạn tại đây!'
        bgrImg='https://i.pinimg.com/originals/c9/3c/3a/c93c3af0efa63545076dfca594a4d174.jpg'
      />
      <Content className='profile__content'>
        <div className='profile__common'>
          <div className='title'>Thông tin chung</div>
          <Divider style={{ backgroundColor: '#F4F2DE' }} />
          <Row className='details'>
            <Form>
              <Item label='Họ và tên'>
                <Input type='text' value={profile.fullName} />
              </Item>
              <Item label='Mã sinh viên'>
                <Input type='text' value={profile.studentId} />
              </Item>
              <Item label='Ngành'>
                <Input type='text' value={profile.fieldStudy} />
              </Item>
              <Item label='Chuyên ngành'>
                <Input type='text' value={profile.major} />
              </Item>
              <Item label='Lớp'>
                <Input type='text' value={profile.classID} />
              </Item>
              <Item label='Địa chỉ'>
                <Input type='text' value={profile.address} />
              </Item>
            </Form>
          </Row>
        </div>
        <div className='profile__contact'>
          <div className='title'>Thông tin liên lạc</div>
          <Divider style={{ backgroundColor: '#F4F2DE' }} />
          <Row className='details'>
            <Form>
              <Item label='Số điện thoại'>
                <Input
                  value={profile.phoneNumber ? profile.phoneNumber : ''}
                  placeholder={profile.phoneNumber === '' ? 'Không có thông tin' : ''}
                  type='text'
                />
              </Item>
              <Item label='Email'>
                <Input
                  value={profile.email ? profile.email : ''}
                  placeholder={profile.email === '' ? 'Không có thông tin' : ''}
                  type='text'
                />
              </Item>
              <Item label='Skype'>
                <Input
                  value={profile.skype ? profile.skype : ''}
                  placeholder={profile.skype === '' ? 'Không có thông tin' : ''}
                  type='text'
                />
              </Item>
            </Form>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ProfileContainer;
