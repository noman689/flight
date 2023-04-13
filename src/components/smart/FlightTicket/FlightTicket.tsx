import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import planeImage from '../../../assets/ticket.svg';
import planeImageBlack from '../../../assets/ticketBlack.svg';
import barCode from '../../../assets/barCode.svg';
import './FlightTicket.scss';
import { isEmpty } from 'ramda';
import moment from 'moment';
import Barcode from 'react-barcode';

const FlightTicket = () => {
  const ticketObj = []

  useEffect(() => {
    const encodedData = (window.location.href.split('=')[1]);
    const meta = (JSON.parse(decodeURIComponent(encodedData)));
    if (!isEmpty(meta)) {
      console.log("id", meta)
      const dataObj = meta.confirmationDetails.data.offer?.data

      dataObj.passengers.map((value) => {
        ticketObj.push({
          passenger: value,
          airline: dataObj.owner,
          currency: dataObj.total_currency,
          amount: dataObj.total_amount,
          slice: meta.selectedSlice[0],
        })
      })
      console.log('ticketObj', ticketObj)
    }
  }, [window.location.href])

  return (
    <div style={{ width: '100%' }
    }>
      {!isEmpty(ticketObj) && ticketObj.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Row className="main" justify={'center'}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={10}
                className="flexCenter borderTopLeftRadius smallscreen-borderrighttop dottedBorder"
              >
                <img src={item.airline.logo_symbol_url} className="planeImage" />

                <span className="fontSize1">{item.airline.name}</span>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={9}
                lg={6}
                className="flexCenter borderTopRightRadius hideOnSmallScreens"
              ></Col>
            </Row>

            <Row justify={'center'} className="RowHeight">
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={10}
                className="displayCenter Row2BorderCol1Top"
              >
                <div>
                  <span className="font70">{item.slice.origin.iata_city_code}</span>
                  <img src={planeImageBlack} className="planeImageWidth mx-image" />
                  <span className="font70">{item.slice.destination.iata_city_code}</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={9} lg={6} className="Row2BorderCol2Top">
                <Row justify={'center'} className="rotate hideOnSmallScreens">
                  <Col xs={24} sm={24} md={24} lg={8}>
                    <div className=" marginLeft10 fontSize20 margin768 fontSizeOn768">
                      <span className="headingColor">Passenger</span>
                      <br />
                      <span>{item.passenger.given_name + " " + item.passenger.family_name}</span>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8}>
                    <div className=" marginLeft10 fontSize20 margin768 fontSizeOn768">
                      <span className="headingColor">Gate</span>
                      <br />
                      <span>23A</span>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className=" marginLeft10 fontSize20 margin768 fontSizeOn768">
                      <span className="headingColor">Departure</span>
                      <br />
                      <span>
                        {moment(item.slice.segments[0].departing_at).format('HH:mm:ss YYYY-MM-DD')}
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
                lg={10}
                className="displayCenter Row2BorderCol1 smallScreen-borderRightBottom"
              >
                <div className="footer-div">
                  <div className="dFlex fontSize20 size768">
                    <div className=" marginLeft10">
                      <span className="headingColor">Passenger</span>
                      <br />
                      <span>{item.passenger.given_name + " " + item.passenger.family_name}</span>
                    </div>
                    <div className=" marginLeft10">
                      <span className="headingColor">Gate</span>
                      <br />
                      <span>23A</span>
                    </div>
                    <div className=" marginLeft10">
                      <span className="headingColor">Departure</span>
                      <br />
                      <span>{moment(item.slice.segments[0].departing_at).format('HH:mm:ss YYYY-MM-DD')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Barcode value={item} displayValue={false} />
                  </div>
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={9}
                lg={6}
                className="Row2BorderCol2 hideOnSmallScreens"
              >
                <Row>
                  <Col xs={24} sm={24} md={5} lg={15}></Col>
                  <Col xs={24} sm={24} md={5} lg={5}>
                    <Barcode value={item} displayValue={false} />
                  </Col>
                </Row>
              </Col>
            </Row>


          </React.Fragment>)

      })}


      <div>testing</div>
    </div >)
};

export default FlightTicket;
