import React from "react";
import {  Card, Tabs } from "antd";
import { GitlabFilled } from "@ant-design/icons";
import FlightSearchCard from './FlightSearchForm';
const { TabPane } = Tabs;
import './BookingCard.scss';
const SearchFlightCard: React.FC = () => {
  return (
    <Card className="CardWrapper">
    <Tabs defaultActiveKey="1" centered= {true}>
      <TabPane
        tab={
          <span>
            <GitlabFilled />
            Book
          </span>
        }
        key="1"
      >
      <Tabs defaultActiveKey="1" className="bookChilds" >
        <TabPane tab="Flights" key="1" >
        <FlightSearchCard />      
        </TabPane>
        <TabPane tab="Qatar Stopover" key="2">
          Content of Qatar Stopover
        </TabPane>
      </Tabs>
     </TabPane>
      <TabPane
        tab={
          <span>
            <GitlabFilled />
            My Trip
          </span>
        }
        key="2"
      >
        Content of Tab Pane 2
      </TabPane>
      <TabPane
        tab={
          <span>
            <GitlabFilled />
            Check In
          </span>
        }
        key="3"
      >
        Content of Tab Pane 3
      </TabPane>
      <TabPane
        tab={
          <span>
            <GitlabFilled />
            Flight Status
          </span>
        }
        key="4"
      >
        Content of Tab Pane 
      </TabPane>
    </Tabs>
    </Card>
  );
};

export default SearchFlightCard;
