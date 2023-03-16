import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import {
  GitlabFilled,
  BookOutlined,
  BranchesOutlined,
  PushpinOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

import './BookingCard.scss';
import FlightSearchForm from '../FlightSearchForm/FlightSearchForm';

const SearchFlightCard = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(screenSize.width);
  const item = [
    {
      label: (
        <span>
          <BookOutlined />
          Book
        </span>
      ),
      key: 'book',
      children: <FlightSearchForm />,
    },
    {
      label: (
        <span>
          <BranchesOutlined />
          My Trip
        </span>
      ),
      key: 'trip',
      children: <> Comming Soon..!</>,
    },
    {
      label: (
        <span>
          <PushpinOutlined />
          Check In
        </span>
      ),
      key: 'checkIn',
      children: <>Comming Soon..!</>,
    },
    screenSize.width > 768 && {
      label: (
        <span style={{ borderRadius: '20px' }}>
          <NotificationOutlined />
          Flight Status
        </span>
      ),
      key: 'flightStatus',
      children: <>Comming Soon..!</>,
    },
  ];
  return (
    <Card className="card-wrapper child">
      <Tabs
        type="card"
        defaultActiveKey="book"
        items={item}
        className="tab-container"
      />
    </Card>
  );
};

export default SearchFlightCard;
