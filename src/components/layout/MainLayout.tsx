import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchFlightCard from '../smart/BookingCard/BookingCard';
import FlightDetail from '../smart/FlightDetails/FlightDetail';
import StickyNavBar from './StickyNavBar/StickyNavBar';
import HeaderComponent from './AppHeader/Header';
import Footer from './AppFooter/Footer';
import './MainLayout.scss';
import PassengerDetailsPage from '../smart/PassengerDetails/PassengerDetailsPage';
import DisplayCards from '../smart/DisplayCards/DisplayCards';
import HomePage from '../smart/HomePage/HomePage';

const { Content } = Layout;

const MainLayout = () => {
  
  return (
    <Layout className="bg-cloud">
      <BrowserRouter>
        <HeaderComponent />
        <StickyNavBar />
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/flight-details/:id"
              element={<FlightDetail />}
            />
            <Route
              path="/passanger-details"
              element={<PassengerDetailsPage />}
            />
          </Routes>
        </Content>
        <Footer />
      </BrowserRouter>
    </Layout>
  );
};

export default MainLayout;
