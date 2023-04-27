import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchFlightCard from '../smart/BookingCard/BookingCard';
import FlightDetail from '../smart/FlightDetails/FlightDetail';
import StickyNavBar from './StickyNavBar/StickyNavBar';
import HeaderComponent from './AppHeader/Header';
import Footer from './AppFooter/Footer';
import './MainLayout.scss';
import PassengerDetailsPage from '../smart/PassengerDetails/PassengerDetailsPage';
import DisplayCards from '../smart/DisplayCards/DisplayCards';
import HomePage from '../smart/HomePage/HomePage';
import HeaderFlightDetails from './HeaderFlightDetails/HeaderFlightDetails';
import SeatSelectionComp from '../smart/SeatSelection/SeatSelection';
import PaymentMethod from '../smart/PaymentMethod/PaymentMethod';
import FlightTicket from '../smart/FlightTicket/FlightTicket';
import FlightTicketTest from '../smart/FlightTicketTest/FlightTicketTest';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import FlightDetailsPdf from '../smart/FlightTicketPdf/FlightTicketPdf';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="bg-cloud">
      <Router>
        {/* <HeaderComponent /> */}
        {/* <StickyNavBar /> */}
        <Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/flight-details/:id" component={FlightDetail} />
            <Route
              exact
              path="/offer-details/:id"
              component={PassengerDetailsPage}
            />
            <Route
              exact
              path="/seat-selection/:id"
              component={SeatSelectionComp}
            />
            <Route exact path="/payment-method" component={PaymentMethod} />

            <Route exact path="/flight-ticket" component={FlightDetailsPdf} />
            <Route
              exact
              path="/234"
              component={FlightTicketTest}
            />
          </Switch>
        </Content>
        {/* <div style={{ marginTop: '50px' }}>
          <Footer />
        </div> */}
      </Router>
    </Layout>
  );
};

export default MainLayout;
