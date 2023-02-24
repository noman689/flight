import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const TestFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#1287f5' }}>
      ©2023 My Airline. All rights reserved.
    </Footer>
  );
}

export default TestFooter;
