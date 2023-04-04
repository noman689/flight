import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { searchFlightAPI } from '@client/services/searchFlightService';

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState([]);
  const today = new Date(); // get current date
  const [loading, setLoading] = useState(false);
  const selectedDate = useSelector((state) => state);
  const [sevenDays, setSevenDays] = useState([]);
  const [tabId, setGetTabId] = useState(3);
  const [getDatesForTabs, setGetDatesForTabs] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    setGetDatesForTabs(
      getDateRangeWithIds(selectedDate.app?.selectedDate?.departure_date),
    );
  }, [selectedDate.app?.selectedDate?.departure_date]);

  useEffect(() => {
    const getOfers = async () => {
      try {
        setLoading(true);
        const data = await getFlightOffersAPI(id);
        setOffersArray(data.data?.offer?.slices);

        setLoading(false);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getOfers();
  }, [id]);

  const item = sevenDays.map((dateObj, index) => {
    today.setHours(0, 0, 0, 0);

    const itemDate = new Date(
      `${dateObj.month} ${dateObj.date}, ${today.getFullYear()}`,
    );
    const disabled = itemDate < today;

    return {
      label: (
        <div className="tab-header">
          <div>
            <span>{`${dateObj.day}, ${dateObj.date} ${dateObj.month ? dateObj.month.substr(0, 3) : ''
              }`}</span>
          </div>
          <div>AED 1,245</div>
        </div>
      ),
      key: index,
      disabled: disabled,
      children: offersArray.map((value, index) => (
        <FlightDetailCard
          fromDate={value.departure_date}
          toDate={value.departure_date}
          departure={value.origin.name}
          departureSub={value.origin.iata_code}
          destination={value.destination.name}
          destinationSub={value.destination.iata_code}
          // plan={value.data.passengers}
          type={value.cabin_class}
          departureImg={`https://source.unsplash.com/1600x900/?${value.origin.name}`}
          departureTime={value.segments[0].departing_at}
          arrivalTime={value.segments[0].arriving_at}
          drawerData={value}
        ></FlightDetailCard>
      )),
    };
  });
  function getDateRangeWithIds(dateString) {
    const centerDate = new Date(dateString);
    const result = [];
    for (let i = -3; i <= 3; i++) {
      const currentDate = new Date(
        centerDate.getTime() + i * 24 * 60 * 60 * 1000,
      );
      result.push({
        id: i + 3, // the ID is the index of the current object in the result array
        date: currentDate.toISOString(),
      });
    }
    return result;
  }

  function getMonthName(monthNumber) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNumber];
  }

  function getDates(date) {
    const selectedDate = new Date(date);
    const dates = [];

    // Add 3 dates before the selected date
    for (let i = 3; i >= 1; i--) {
      const dateBefore = new Date(
        selectedDate.getTime() - i * 24 * 60 * 60 * 1000,
      );
      dates.push({
        id: i - 1,
        date: dateBefore.getDate(),
        month: getMonthName(dateBefore.getMonth()),
        day: dateBefore.toLocaleString('default', { weekday: 'short' }),
      });
    }

    // Add the selected date
    dates.push({
      id: 3,
      date: selectedDate.getDate(),
      month: getMonthName(selectedDate.getMonth()),
      day: selectedDate.toLocaleString('default', { weekday: 'short' }),
    });

    // Add 3 dates after the selected date
    for (let i = 1; i <= 3; i++) {
      const dateAfter = new Date(
        selectedDate.getTime() + i * 24 * 60 * 60 * 1000,
      );
      dates.push({
        id: i + 3,
        date: dateAfter.getDate(),
        month: getMonthName(dateAfter.getMonth()),
        day: dateAfter.toLocaleString('default', { weekday: 'short' }),
      });
    }

    // Reset ids to consecutive numbers starting from 0
    return dates.map((date, index) => ({ ...date, id: index }));
  }

  function getObjectById(id, objectArray) {
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i].id === id) {
        return objectArray[i];
      }
    }
    return null; // return null if no object with matching ID is found
  }

  useEffect(() => {
    // setSelectionDate(selectedDate.app?.selectedDate?.departure_date);
    setSevenDays(getDates(selectedDate.app?.selectedDate?.departure_date));
  }, [selectedDate]);

  const apiCall = async (object) => {
    const response = await searchFlightAPI(object);
    navigate(`/flight-details/${response.data?.offer_id}`);
  };

  useEffect(() => {
    let apiPayload = selectedDate.app?.selectedDate;
    function updateDepartureDateById(newDepartureDate) {
      apiPayload = { ...apiPayload, departure_date: newDepartureDate };
      return apiPayload;
    }

    if (tabId !== 3) {
      apiCall(
        updateDepartureDateById(getObjectById(tabId, getDatesForTabs).date),
      );
    }
  }, [selectedDate.app?.selectedDate, tabId]);

  return (
    <div className="main_page_width m-b-30">
      {loading ? (
        <Spin />
      ) : (
        <Row justify="center">
          <Tabs
            tabBarStyle={{
              display: "flex",
              justifyContent: "space-between"
            }}
            onTabClick={(e) => {
              setGetTabId(e);
            }}
            activeKey={tabId}
            defaultActiveKey={3}
            items={item}
          />
        </Row>
      )}
    </div>
  );
};

export default FlightDetail;
