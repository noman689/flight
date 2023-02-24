import React from 'react';
import {  Layout ,Avatar, Row, Col } from 'antd';
import { GitlabFilled, UserOutlined } from '@ant-design/icons';
import './Header.scss';

interface Props {
}

const HeaderComponent: React.FC<Props> = () => {
  return (
    <Layout.Header className="header">
      <Row align="middle">
        <div style={{float:"left"}}>
        <GitlabFilled />
        Logo

        </div>
    {/* <div className= "icon" style={{right: 0}}>
    <Avatar size="large" icon={<UserOutlined />}  />
    </div> */}
      </Row>
    </Layout.Header>

  );
};

export default HeaderComponent;

