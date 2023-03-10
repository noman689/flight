import React, { useState, useEffect } from 'react';
import './StickyNavBar.scss';

import {
  UserOutlined,
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Explore',
  },
  {
    key: '2',
    label: 'Book',
  },
  {
    key: '3',
    label: 'Experience',
  },
  { key: '4', label: 'Privilege Club' },
];
interface NavbarProps {
  // add any props you need
}

const StickyNavBar = (props: NavbarProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {

    console.log(window.pageYOffset, 'window.pageYOffset');
    if (window.pageYOffset >= 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  return (
    <div className={`navbar bannerDivs parents ${isSticky ? 'sticky' : ''}`}>
      <Row justify={'center'}>
          <Col xs={24} sm={24} md={24} lg={20}>
      <div className="hideOnLargeScreens">
        
        <div className="dFlexEnds">
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['1'],
            }}
          >
            <Typography.Link>
              <Space>
                <div className="menus">
                  <MenuOutlined />
                </div>
              </Space>
            </Typography.Link>
          </Dropdown>
          <span className="headerTextss">
            <UserOutlined /> login | Sign Up
          </span>
        </div>
      </div>
      <div className="navLinkss hideOnSmallScreens main_page_widths">
        <div className="headers">
          <div className="d-flexs">
            <img src="https://cssgradient.io/images/logo-55c31c59.svg" />
            <Link to={'/'}>
              <span className="headerTextss">Explore</span>
            </Link>
            <span className="headerTextss">Book</span>
            <span className="headerTextss">Experience</span>
            <span className="headerTextss">Privilege Club</span>
          </div>
          <div className="d-flex">
            <span className="headerTextss">Help</span>
            <span className="headerTextss">
              <SearchOutlined />
            </span>
            <span className="headerTextss">EN</span>
            <span className="headerTextss">
              <UserOutlined /> login | Sign Up
            </span>
          </div>
        </div>
      </div>
     </Col>
     </Row>
    </div>
  );
};

export default StickyNavBar;
