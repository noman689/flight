import React from 'react';
import { Card, Tabs } from 'antd';
import { GitlabFilled } from '@ant-design/icons';
import './BookingCard.scss';
import FlightSearchForm from './FlightSearchForm';

const item = [
  {
    label: (
      <span>
        <GitlabFilled />
        Book
      </span>
    ),
    key: 'book',
    children: <FlightSearchForm />,
  },
  {
    label: (
      <span>
        <GitlabFilled />
        My Trip
      </span>
    ),
    key: 'trip',
    children: <> Comming Soon..!</>,
  },
  {
    label: (
      <span>
        <GitlabFilled />
        Check In
      </span>
    ),
    key: 'checkIn',
    children: <>Comming Soon..!</>,
  },
  {
    label: (
      <span style={{ borderRadius: '20px' }}>
        <GitlabFilled />
        Flight Status
      </span>
    ),
    key: 'flightStatus',
    children: <>Comming Soon..!</>,
  },
];

const SearchFlightCard: React.FC = () => {
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
