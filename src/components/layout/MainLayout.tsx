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

const { Content } = Layout;

const MainLayout = () => {
  const sampleObj = [
    {
      data: {
        slices: [
          {
            origin_type: 'city',
            origin: {
              type: 'city',
              time_zone: null,
              name: 'New York',
              longitude: null,
              latitude: null,
              id: 'cit_nyc_us',
              icao_code: null,
              iata_country_code: 'US',
              iata_code: 'NYC',
              iata_city_code: 'NYC',
              city_name: null,
              city: null,
              airports: [
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'LaGuardia Airport',
                  longitude: -73.873281,
                  latitude: 40.777062,
                  id: 'arp_lga_us',
                  icao_code: 'KLGA',
                  iata_country_code: 'US',
                  iata_code: 'LGA',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'John F. Kennedy International Airport',
                  longitude: -73.778519,
                  latitude: 40.640556,
                  id: 'arp_jfk_us',
                  icao_code: 'KJFK',
                  iata_country_code: 'US',
                  iata_code: 'JFK',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Newark Liberty International Airport',
                  longitude: -74.171581,
                  latitude: 40.691016,
                  id: 'arp_ewr_us',
                  icao_code: 'KEWR',
                  iata_country_code: 'US',
                  iata_code: 'EWR',
                  iata_city_code: 'NYC',
                  city_name: 'Newark',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'New York Skyports Seaplane Base Airport',
                  longitude: -73.973717,
                  latitude: 40.735,
                  id: 'arp_nys_us',
                  icao_code: null,
                  iata_country_code: 'US',
                  iata_code: 'NYS',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'New York Stewart International Airport',
                  longitude: -74.102724,
                  latitude: 41.501292,
                  id: 'arp_swf_us',
                  icao_code: 'KSWF',
                  iata_country_code: 'US',
                  iata_code: 'SWF',
                  iata_city_code: 'NYC',
                  city_name: 'Newburgh',
                },
              ],
            },
            destination_type: 'city',
            destination: {
              type: 'city',
              time_zone: null,
              name: 'Atlanta',
              longitude: null,
              latitude: null,
              id: 'cit_atl_us',
              icao_code: null,
              iata_country_code: 'US',
              iata_code: 'ATL',
              iata_city_code: 'ATL',
              city_name: null,
              city: null,
              airports: [
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Hartsfield-Jackson Atlanta International Airport',
                  longitude: -84.4279,
                  latitude: 33.638714,
                  id: 'arp_atl_us',
                  icao_code: 'KATL',
                  iata_country_code: 'US',
                  iata_code: 'ATL',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Fulton County Airport',
                  longitude: -84.521638,
                  latitude: 33.777896,
                  id: 'arp_fty_us',
                  icao_code: 'KFTY',
                  iata_country_code: 'US',
                  iata_code: 'FTY',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Dekalb Peachtree Airport',
                  longitude: -84.303619,
                  latitude: 33.875583,
                  id: 'arp_pdk_us',
                  icao_code: 'KPDK',
                  iata_country_code: 'US',
                  iata_code: 'PDK',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
              ],
            },
            departure_date: '2023-06-21',
            created_at: '2023-03-04T14:37:14.625637Z',
          },
          {
            origin_type: 'city',
            origin: {
              type: 'city',
              time_zone: null,
              name: 'Atlanta',
              longitude: null,
              latitude: null,
              id: 'cit_atl_us',
              icao_code: null,
              iata_country_code: 'US',
              iata_code: 'ATL',
              iata_city_code: 'ATL',
              city_name: null,
              city: null,
              airports: [
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Hartsfield-Jackson Atlanta International Airport',
                  longitude: -84.4279,
                  latitude: 33.638714,
                  id: 'arp_atl_us',
                  icao_code: 'KATL',
                  iata_country_code: 'US',
                  iata_code: 'ATL',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Fulton County Airport',
                  longitude: -84.521638,
                  latitude: 33.777896,
                  id: 'arp_fty_us',
                  icao_code: 'KFTY',
                  iata_country_code: 'US',
                  iata_code: 'FTY',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Dekalb Peachtree Airport',
                  longitude: -84.303619,
                  latitude: 33.875583,
                  id: 'arp_pdk_us',
                  icao_code: 'KPDK',
                  iata_country_code: 'US',
                  iata_code: 'PDK',
                  iata_city_code: 'ATL',
                  city_name: 'Atlanta',
                },
              ],
            },
            destination_type: 'city',
            destination: {
              type: 'city',
              time_zone: null,
              name: 'New York',
              longitude: null,
              latitude: null,
              id: 'cit_nyc_us',
              icao_code: null,
              iata_country_code: 'US',
              iata_code: 'NYC',
              iata_city_code: 'NYC',
              city_name: null,
              city: null,
              airports: [
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'LaGuardia Airport',
                  longitude: -73.873281,
                  latitude: 40.777062,
                  id: 'arp_lga_us',
                  icao_code: 'KLGA',
                  iata_country_code: 'US',
                  iata_code: 'LGA',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'John F. Kennedy International Airport',
                  longitude: -73.778519,
                  latitude: 40.640556,
                  id: 'arp_jfk_us',
                  icao_code: 'KJFK',
                  iata_country_code: 'US',
                  iata_code: 'JFK',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'Newark Liberty International Airport',
                  longitude: -74.171581,
                  latitude: 40.691016,
                  id: 'arp_ewr_us',
                  icao_code: 'KEWR',
                  iata_country_code: 'US',
                  iata_code: 'EWR',
                  iata_city_code: 'NYC',
                  city_name: 'Newark',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'New York Skyports Seaplane Base Airport',
                  longitude: -73.973717,
                  latitude: 40.735,
                  id: 'arp_nys_us',
                  icao_code: null,
                  iata_country_code: 'US',
                  iata_code: 'NYS',
                  iata_city_code: 'NYC',
                  city_name: 'New York',
                },
                {
                  type: 'airport',
                  time_zone: 'America/New_York',
                  name: 'New York Stewart International Airport',
                  longitude: -74.102724,
                  latitude: 41.501292,
                  id: 'arp_swf_us',
                  icao_code: 'KSWF',
                  iata_country_code: 'US',
                  iata_code: 'SWF',
                  iata_city_code: 'NYC',
                  city_name: 'Newburgh',
                },
              ],
            },
            departure_date: '2023-07-21',
            created_at: '2023-03-04T14:37:14.627468Z',
          },
        ],
        passengers: [
          {
            type: 'adult',
            loyalty_programme_accounts: [],
            id: 'pas_0000ATH6YMlRW8dbnGmKIr',
            given_name: null,
            fare_type: null,
            family_name: null,
            age: null,
          },
          {
            type: 'adult',
            loyalty_programme_accounts: [],
            id: 'pas_0000ATH6YMlRW8dbnGmKIs',
            given_name: null,
            fare_type: null,
            family_name: null,
            age: null,
          },
          {
            type: null,
            loyalty_programme_accounts: [],
            id: 'pas_0000ATH6YMlRW8dbnGmKIt',
            given_name: null,
            fare_type: null,
            family_name: null,
            age: 1,
          },
        ],
        live_mode: false,
        id: 'orq_0000ATH6YMl5XSM1mAc2ka',
        created_at: '2023-03-04T14:37:14.622368Z',
        cabin_class: 'business',
      },
    },
  ];
  const cards = [
    {
      id: 1,
      imageUrl: './1.jpg',
      link: '#',
      title: 'Card 1',
      description: 'This is the first card',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/250',
      link: 'https://example.com/link2',
      title: 'Card 2',
      description: 'This is the second card',
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/100',
      link: 'https://example.com/link3',
      title: 'Card 3',
      description: 'This is the third card',
    },
    {
      id: 4,
      imageUrl: 'https://picsum.photos/100',
      link: 'https://example.com/link4',
      title: 'Card 4',
      description: 'This is the fourth card',
    },
  ];
  const [apiData, setApiData] = useState<any>(sampleObj);
  return (
    <Layout className="bg-cloud">
      <BrowserRouter>
        <HeaderComponent />
        <StickyNavBar />
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* <SearchFlightCard /> */}
                  <DisplayCards cards={cards} />
                </>
              }
            />
            <Route
              path="/flight-details"
              element={<FlightDetail apiData={apiData} />}
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
