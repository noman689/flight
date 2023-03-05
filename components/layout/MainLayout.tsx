import React from 'react';
import { Layout } from 'antd';
import SearchFlightCard from '../smart/SearchFlightCard/BookingCard';
import ParentFlightDetail from './ParentFlightDetail';
import { BrowserRouter, Routes, Route, useSubmit } from 'react-router-dom';
import PassengerDetailsForm from './PassengerDetailsForm';
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
            <Route
              path="/passenger-details"
              element={<PassengerDetailsForm />}
            />
          </Routes>
        </Content>
      </BrowserRouter>

      <Footer />
    </Layout>
  );
};

export default MainLayout;
