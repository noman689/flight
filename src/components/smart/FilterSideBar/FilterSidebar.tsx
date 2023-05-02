import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import transitionIcon from '../../../assets/trans-img.png';
// @ts-ignore
import planeIcon from '../../../assets/ticketBlack.svg';

import './FilterSideBar.scss';
import moment from 'moment';
import { Radio, Space } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

const FilterSidebar = ({ data = [], collapsed, setCollapsed }) => {
  console.log('FilterSidebar', data);
  const history = useHistory()
  const location = useLocation();

  const [flightInfo, setFlightInfo] = useState({
    origin: '',
    destination: '',
    passengerCount: 0,
    cabinClass: '',
    isReturnFlight: false,
    startDate: '',
    endDate: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [stops, setStops] = useState('');
  const [stopsFilter, setStopsFilter] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSortBy(searchParams.get('sort_by') || '');
    setStops(searchParams.get('stops') || '');
  }, [location.search]);

  function handleSortByChange(e) {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort_by', newSortBy);
    history.push({ search: searchParams.toString() });
  }

  function handleStopsChange(e) {
    const newStops = e.target.value;
    setStops(newStops);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('stops', newStops);
    history.push({ search: searchParams.toString() });
  }

  const getFlightInfo = () => {
    let startDate;
    let endDate;
    if (data[0]) {
      const origin = data[0].slices[0].segments[0].origin.iata_city_code;
      const destination =
        data[0].slices[0].segments[data[0].slices[0].segments.length - 1]
          .destination.iata_city_code;
      const passengerCount = data[0].slices[0].segments[0].passengers.length;
      const cabinClass =
        data[0].slices[0].segments[0].passengers[0].cabin_class;
      const isReturnFlight = data[0].slices.length > 1;
      if (isReturnFlight) {
        startDate = data[0].slices[0].segments[0].departing_at;
        endDate =
          data[0].slices[data[0].slices.length - 1].segments[
            data[0].slices[0].segments.length - 1
          ]?.arriving_at;
      } else {
        startDate = data[0].slices[0].segments[0].departing_at;
        endDate =
          data[0].slices[0].segments[data[0].slices[0].segments.length - 1]
            ?.arriving_at;
      }
      return {
        origin,
        destination,
        passengerCount,
        cabinClass,
        isReturnFlight,
        startDate,
        endDate,
      };
    }
  };

  console.log("testing-location", window.location)

  // useEffect(()=>{

  // },[sortBy,stopsFilter])

  useEffect(() => {
    const result = getFlightInfo();
    setFlightInfo(result);
  }, [data]);

  return (
    <>
      {!collapsed ? (
        <div
          className="sideBarOverlay"
          onClick={() => setCollapsed((prevState) => !prevState)}
        />
      ) : (
        ''
      )}
      {!collapsed ? (
        <Sider
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            overflowY: 'auto',
            marginTop: '20px',
            zIndex: 20,
          }}
          className="filter-sidebar"
        >
          <div className="about-info">
            <div className="flight-info">
              <span>{flightInfo?.origin}</span>
              <span>
                {flightInfo?.isReturnFlight ? (
                  <img src={transitionIcon} width={40} />
                ) : (
                  <img src={planeIcon} width={40} />
                )}
              </span>
              <span>{flightInfo?.destination}</span>
            </div>
            <div className="date-section">
              <span>
                {moment(flightInfo?.startDate).format('MMM Do YY')} -{' '}
                {moment(flightInfo?.endDate).format('MMM Do YY')}
              </span>
            </div>
            <div className="other-info-section">
              <span className="child-section">
                {flightInfo?.cabinClass.toUpperCase()}
              </span>
              <span className="child-section">
                Passengers {flightInfo?.passengerCount}
              </span>
            </div>
            <div className="sort-section">
              <span className="sort-heading">Sort by</span>
              <Radio.Group
                onChange={(e) => {
                  handleSortByChange(e)
                  // history.push({
                  //   pathname: window.location.pathname,
                  //   search: `${window.location.search.length ? window.location.search + `&sort_by=${e.target.value}` : `sort_by=${e.target.value}`}`,
                  // });
                }
                  // setSortBy(e.target.value)
                }
                defaultValue={'least-expensive'}
              // value={sortBy}
              >
                <Space direction="vertical">
                  <Radio value={'least-expensive'}>Least expensive</Radio>
                  <Radio value={'most-expensive'}>Most Expensive</Radio>
                  <Radio value={'shortest-duration'}>Shortest duration</Radio>
                  <Radio value={'longest-duration'}>Longest duration</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="sort-section">
              <span className="sort-heading">Stops</span>
              <Radio.Group
                onChange={(e) => handleStopsChange(e)}
                value={stopsFilter}
              >
                <Space direction="vertical">
                  <Radio value={'direct'}>Direct only</Radio>
                  <Radio value={'one-stop'}>1 stop at most</Radio>
                  <Radio value={'two-stops'}>2 stops at most</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Sider>
      ) : (
        <></>
      )}
    </>
  );
};

export default FilterSidebar;
