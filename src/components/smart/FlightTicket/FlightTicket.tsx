import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import planeImage from '../../../assets/ticket.svg';
import planeImageBlack from '../../../assets/ticketBlack.svg';
import barCode from '../../../assets/barCode.svg';
import './FlightTicket.scss';

const FlightTicket = () => {
  const [encodedData, setEncodedData] = useState('')
  const [meta, setMeta] = useState('')

  useEffect(() => {
    debugger
    const encodedData = (window.location.href.split('=')[1]);
    setMeta(JSON.parse(decodeURIComponent(encodedData)));

  }, [window.location.href])

  console.log(meta)
  return (
    <div style={{ width: '100%' }}>
      <Row className="main" justify={'center'}>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          className="flexCenter borderTopLeftRadius dottedBorder"
        >
          <img src={planeImage} className="planeImage" />

          <span className="fontSize1">AIR TICKET</span>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={5}
          lg={5}
          className="flexCenter borderTopRightRadius"
        ></Col>
      </Row>

      <Row justify={'center'} className="RowHeight">
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          className="displayCenter Row2BorderCol1Top"
        >
          <div>
            <span className="font70">NYC</span>
            <img src={planeImageBlack} className="planeImageWidth mx-image" />
            <span className="font70">LHR</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={5} lg={5} className="Row2BorderCol2Top">
          <Row justify={'center'} className="rotate ">
            <Col xs={24} sm={24} md={5} lg={8}>
              <div className=" marginLeft10 fontSize20">
                <span className="headingColor">Passenger</span>
                <br />
                <span>Jhon Jack</span>
              </div>
            </Col>
            <Col xs={24} sm={24} md={5} lg={8}>
              <div className=" marginLeft10 fontSize20">
                <span className="headingColor">Gate</span>
                <br />
                <span>23A</span>
              </div>
            </Col>
            <Col xs={24} sm={24} md={5} lg={24}>
              <div className=" marginLeft10 fontSize20">
                <span className="headingColor">Departure</span>
                <br />
                <span>06:55 12 DEC 2019</span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          className="displayCenter Row2BorderCol1"
        >
          <div className="footer-div ">
            <div className="dFlex fontSize20">
              <div className=" marginLeft10">
                <span className="headingColor">Passenger</span>
                <br />
                <span>Jhon Jack</span>
              </div>
              <div className=" marginLeft10">
                <span className="headingColor">Gate</span>
                <br />
                <span>23A</span>
              </div>
              <div className=" marginLeft10">
                <span className="headingColor">Departure</span>
                <br />
                <span>06:55 12 DEC 2019</span>
              </div>
            </div>
            <div>
              <img style={{ width: '70px' }} src={barCode} />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={5} lg={5} className="Row2BorderCol2">
          <Row>
            <Col xs={24} sm={24} md={5} lg={15}></Col>
            <Col xs={24} sm={24} md={5} lg={5}>
              <img style={{ width: '70px' }} src={barCode} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FlightTicket;
