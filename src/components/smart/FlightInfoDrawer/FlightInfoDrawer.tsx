import React, { useState } from 'react';
import { Typography, Divider, Drawer, List, Row, Timeline, Space } from 'antd';
const { Text } = Typography;
import './FlightInfoDrawer.scss';

interface FlightInfoDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightInfoDrawer = ({ open, setOpen }: FlightInfoDrawerProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <h3 className="drawer-top-heading">Flight Details</h3>
        <Row>
          <Timeline
            mode={'left'}
            items={[
              {
                label: '03:15',
                color: 'green',
                children: (
                  <>
                    <p>Islamabad</p>
                    <p>Islamabad International Airport (ISB)</p>
                  </>
                ),
              },
              {
                label: '4h',
                color: 'gray',
                children: (
                  <>
                    <p>QR633 - Boeing 787-9</p>
                    <p>Operated by Qatar Airways</p>
                  </>
                ),
              },
              {
                label: '05:15',
                color: 'green',
                children: (
                  <>
                    <p>Doha</p>
                    <p>Hamad International Airport (DOH)</p>
                  </>
                ),
              },
            ]}
          />
        </Row>

        <Divider />
        <Space direction="vertical">
          <Text>2h 30m transit in Doha</Text>
          <Text style={{ marginTop: 10 }}>
            Hamad International Airport (DOH)
          </Text>
          <Text type="secondary">Skytrax World’s Best Airport 2022</Text>
        </Space>

        <Divider />
        <h5> Friday, Mar 10</h5>
        <Row>
          <Timeline
            mode={'left'}
            items={[
              {
                label: '07:45',
                color: 'green',
                children: (
                  <>
                    <p>Doha</p>
                    <p>Hamad International Airport (DOH)</p>
                  </>
                ),
              },
              {
                label: '1h 15m',
                color: 'gray',
                children: (
                  <>
                    <p>QR1038 - Airbus A320</p>
                    <p>Operated by Qatar Airways</p>
                  </>
                ),
              },
              {
                label: '10:00',
                color: 'green',
                children: (
                  <>
                    <p>Sharjah</p>
                    <p>Sharjah International Airport (SHJ)</p>
                  </>
                ),
              },
            ]}
          />
        </Row>
      </Drawer>
    </>
  );
};

export default FlightInfoDrawer;
