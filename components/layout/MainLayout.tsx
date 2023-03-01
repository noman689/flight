import React from 'react';
import { Layout } from 'antd';
import SearchFlightCard from '../smart/SearchFlightCard/BookingCard';
import ParentFlightDetail from './ParentFlightDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HeaderComponent from './Header';
import TestFooter from './Footer';
import Banner from './Banner';
import './MainLayout.scss';
const { Content } = Layout;

const MainLayout = () => {
  return (
    // <Layout>
    //   {/* <HeaderComponent /> */}

    //   <Banner />

    //   <Content>
    //     <SearchFlightCard />
    //   </Content>
    //   {/*
    //   <TestFooter /> */}
    // </Layout>
    <Layout>
      <BrowserRouter>
        <Banner />
        <Content>
          <Routes>
            <Route path="/" element={<SearchFlightCard />} />
            <Route path="/flight-details" element={<ParentFlightDetail />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </Layout>
  );
};

export default MainLayout;
