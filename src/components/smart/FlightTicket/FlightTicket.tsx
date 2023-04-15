import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'antd';
// @ts-ignore
import planeImageBlack from '../../../assets/ticketBlack.svg';
import './FlightTicket.scss';
import { isEmpty } from 'ramda';
import moment from 'moment';
// import Barcode from 'react-barcode';
import JsBarcode from 'jsbarcode';

const FlightTicket = () => {
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    const encodedData = window.location.href.split('=')[1];
    const meta = JSON.parse(decodeURIComponent(encodedData));
    if (!isEmpty(meta)) {
      console.log('id', meta);
      const dataObj = meta.confirmationDetails.data.offer?.data;

      dataObj.passengers.map((value) => {
        setTicketsData((prev) => [
          ...prev,
          {
            passenger: value,
            airline: dataObj.owner,
            currency: dataObj.total_currency,
            amount: dataObj.total_amount,
            slice: meta.selectedSlice[0],
          },
        ]);
      });
    }
  }, [window.location.href]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Update screen size on window resize
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    if (canvasRef1.current && ticketsData.length) {
      // Generate Code128 barcode for canvasRef1
      JsBarcode(canvasRef1.current, `pas_0000AUfwP92zG9VyiE2sUP`, {
        format: 'CODE128',
        displayValue: false,
        width: screenWidth <= 768 ? 0.5 : 1,
        height: screenWidth <= 768 ? 25 : 50,
      });
    }
    if (canvasRef2.current && ticketsData.length) {
      // Generate Code39 barcode for canvasRef2
      JsBarcode(canvasRef2.current, 'pas_0000AUfwP92zG9VyiE2sUP', {
        format: 'CODE128',
        displayValue: false,
        width: screenWidth <= 768 ? 1.5 : 2,
        height: screenWidth <= 768 ? 25 : 30,
      });
    }
  }, [ticketsData]);

  return (
    <div style={{ width: '100%' }}>
      {ticketsData.length &&
        ticketsData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row className="main" justify={'center'}>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={screenWidth === 1024 ? 11 : 8}
                  className="flexCenter borderTopLeftRadius smallscreen-borderrighttop dottedBorder"
                >
                  <img
                    src={item.airline.logo_symbol_url}
                    className="planeImage"
                  />

                  <span className="fontSize1">{item.airline.name}</span>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={9}
                  lg={screenWidth === 1024 ? 7 : 4}
                  className="flexCenter borderTopRightRadius hideOnSmallScreens"
                ></Col>
              </Row>

              <Row justify={'center'} className="RowHeight">
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={screenWidth === 1024 ? 11 : 8}
                  className="displayCenter Row2BorderCol1Top"
                >
                  <div>
                    <span className="font70">
                      {item.slice.origin.iata_city_code}
                    </span>
                    <img
                      src={planeImageBlack}
                      className="planeImageWidth mx-image"
                    />
                    <span className="font70">
                      {item.slice.destination.iata_city_code}
                    </span>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={9}
                  lg={screenWidth === 1024 ? 7 : 4}
                  className="Row2BorderCol2Top"
                >
                  <Row justify={'center'} className="rotate hideOnSmallScreens">
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
                        <span className="headingColor">Passenger</span>
                        <br />
                        <span>
                          {item.passenger.given_name +
                            ' ' +
                            item.passenger.family_name}
                        </span>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
                        <span className="headingColor">Gate</span>
                        <br />
                        <span>23A</span>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
                        <span className="headingColor">Departure</span>
                        <br />
                        <span>
                          {moment(item.slice.segments[0].departing_at).format(
                            'HH:mm:ss YYYY-MM-DD',
                          )}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row justify={'center'}>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={screenWidth === 1024 ? 11 : 8}
                  className="displayCenter Row2BorderCol1 smallScreen-borderRightBottom"
                >
                  <div className="footer-div">
                    <div className="dFlex fontSize20 size768">
                      <div className=" marginLeft10">
                        <span className="headingColor">Passenger</span>
                        <br />
                        <span>
                          {item.passenger.given_name +
                            ' ' +
                            item.passenger.family_name}
                        </span>
                      </div>
                      <div className=" marginLeft10">
                        <span className="headingColor">Gate</span>
                        <br />
                        <span>23A</span>
                      </div>
                      <div className=" marginLeft10">
                        <span className="headingColor">Departure</span>
                        <br />
                        <span>
                          {moment(item.slice.segments[0].departing_at).format(
                            'HH:mm:ss YYYY-MM-DD',
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      {/* <Barcode displayValue={false} />
                <canvas ref={canvasRef} /> */}
                      <canvas ref={canvasRef1} />
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={9}
                  lg={screenWidth === 1024 ? 7 : 4}
                  className="Row2BorderCol2 hideOnSmallScreens"
                >
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      style={{ textAlign: 'center', marginTop: '20px' }}
                    >
                      <canvas ref={canvasRef2} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default FlightTicket;
