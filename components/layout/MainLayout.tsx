import React from 'react';
import { Layout } from 'antd';
import SearchFlightCard from '../smart/SearchFlightCard/BookingCard';
import ParentFlightDetail from './ParentFlightDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HeaderComponent from './Header';
import Banner from './Banner';
import './MainLayout.scss';
import Footer from './Footer';
const { Content } = Layout;

const MainLayout = () => {
  return (
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
      <Footer />
    </Layout>
  );
};

export default MainLayout;
