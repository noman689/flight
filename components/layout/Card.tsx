
import React from 'react';
import { useState } from 'react';
import { Card } from 'antd';
import './Card.scss';
const { Meta } = Card;

const data = [
  {
    id: 1,
    title: 'Book',
    content: 'book'
  },
  {
    id: 2,
    title: 'My Trips',
    content: 'trips'
  },
  {
    id: 3,
    title: 'Check In',
    content: 'check'
  },
  {
    id: 4,
    title: 'Flight Status',
    content: 'flight'
  }
];

const CardWithTabs = () => {
  const [activeTab, setActiveTab] = useState({ id: 1 });

  const handleTabClick = (id) => {
    setActiveTab({ id });
  };

  const { content } = (() => {
    switch (activeTab.id) {
      case 1:
        return data[0];
      case 2:
        return data[1];
      case 3:
        return data[2];
      case 4:
        return data[3];
      default:
        return data[0];
    }
  })();

  return (
    <Card style={{ width: '40%', margin: '20px' }}>
      <div className="card-tabs">
        {data.map(item => (
          <div
            key={item.id}
            className={`card-tab ${activeTab.id === item.id ? 'active' : ''}`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <Meta description={content} />
    </Card>
  );
};

export default CardWithTabs;

