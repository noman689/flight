import React from 'react';
import './CommonStyles.scss';
import {
  UserOutlined,
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

interface Props {}
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

const Banner: React.FC<Props> = () => {
  return (
    <div className="bannerDiv parent main_page_width">
      <div className="hideOnLargeScreen">
        <div className="dFlexEnd">
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['1'],
            }}
          >
            <Typography.Link>
              <Space>
                <div className="menu">
                  <MenuOutlined />
                </div>
              </Space>
            </Typography.Link>
          </Dropdown>
          <span className="headerTexts">
            <UserOutlined /> login | Sign Up
          </span>
        </div>
        <div className="container">
          <span className="HeadingBanner">
            Discover Amazing
            <br /> Online Offers
          </span>
          <br />
          <span className="saveupto">Save Upto 20%</span>
          <div className="padding10">
            <Button className="btnBookNow">Book Now</Button>
          </div>
        </div>
      </div>
      <div className="navLinks hideOnSmallScreen">
        <div className="header">
          <div className="d-flex">
            <img src="https://cssgradient.io/images/logo-55c31c59.svg" />
            <Link to={'/'}>
              <span className="headerTexts">Explore</span>
            </Link>
            <span className="headerTexts">Book</span>
            <span className="headerTexts">Experience</span>
            <span className="headerTexts">Privilege Club</span>
          </div>
          <div className="d-flex">
            <span className="headerTexts">Help</span>
            <span className="headerTexts">
              <SearchOutlined />
            </span>
            <span className="headerTexts">EN</span>
            <span className="headerTexts">
              <UserOutlined /> login | Sign Up
            </span>
          </div>
        </div>

        <div className="container">
          <span className="HeadingBanner">
            Discover Amazing
            <br /> Online Offers
          </span>
          <br />
          <span className="saveupto">Save Upto 20%</span>
          <div className="padding10">
            <Button className="btnBookNow">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
