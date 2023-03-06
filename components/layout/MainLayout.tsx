import React from 'react';
import { Layout } from 'antd';
import SearchFlightCard from '../smart/SearchFlightCard/BookingCard';
import ParentFlightDetail from './ParentFlightDetail';
import { BrowserRouter, Routes, Route, useSubmit } from 'react-router-dom';
import MultiPassengerForm from './MultiPassengerForm';
import Banner from './Banner';
import './MainLayout.scss';
import Footer from './Footer';
const { Content } = Layout;

const MainLayout = () => {
  const handleSubmit = (data: any) => {};
  return (
    <Layout>
      <BrowserRouter>
        <Banner />
        <Content>
          <Routes>
            <Route path="/" element={<SearchFlightCard />} />
            <Route path="/flight-details" element={<ParentFlightDetail />} />
            <Route path="/passenger-details" element={<MultiPassengerForm />} />
          </Routes>
        </Content>
      </BrowserRouter>

      <Footer />
    </Layout>
  );
};

export default MainLayout;
