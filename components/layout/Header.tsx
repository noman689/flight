import React from 'react';
import {  Layout ,Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.scss';

interface Props {
}

const HeaderComponent: React.FC<Props> = () => {
  return (
    <Layout.Header className="header">
      <Row align="middle">
      <Col span={4}>
          <img src="https://picsum.photos/40/40" alt="Logo" className="logo" />
        </Col>
        <Col span={16} >
        <a className="anchor" href="#">
        BOOK
      </a>
    </Col>
        <Col span={4}>
          <Avatar size="large" icon={<UserOutlined />} className= "icon" />
        </Col>
      </Row>
    </Layout.Header>

  );
};

export default HeaderComponent;

