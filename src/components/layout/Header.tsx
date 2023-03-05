import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import { GitlabFilled, UserOutlined } from '@ant-design/icons';
import './Header.scss';

interface Props {}

const HeaderComponent: React.FC<Props> = () => {
  return (
    <Layout.Header className="header main_page_width">
      <Row align="middle">
        <div style={{ float: 'left' }}>
          <GitlabFilled />
          Logo
        </div>
      </Row>
    </Layout.Header>
  );
};

export default HeaderComponent;
