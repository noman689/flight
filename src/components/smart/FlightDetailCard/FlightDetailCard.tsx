import { Row, Col, Divider, Button, Modal, Timeline } from 'antd';
import moment from 'moment';
// @ts-ignore
import planeImageBlack from '../../../assets/ticketBlack.svg';
import './FlightDetailCard.scss';
import { useHistory } from 'react-router-dom';
import { CloudFilled, LockFilled } from '@ant-design/icons';
import { useState } from 'react';

const info = () => {
  Modal.info({
    centered: true,
    title: 'Flight Details',
    content: (
      <div>
        <h5> Friday, Mar 10</h5>
        <div>
          <Timeline
            className="info-timeline"
            mode={'left'}
            items={[
              {
                label: '03:14',
                color: 'green',
                children: (
                  <>
                    <p>city name</p>
                    <span>city code</span>
                  </>
                ),
              },
              {
                label: '4h',
                color: 'gray',
                children: (
                  <>
                    <p>plane Name</p>
                    <span>Operated by Duffle Airways</span>
                  </>
                ),
              },
              {
                label: '05:15',
                color: 'green',
                children: (
                  <>
                    <p>destination</p>
                    <span>destination code</span>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    ),
    onOk() {},
  });
};

const FlightDetailCard = ({ data }) => {
  const [modal2Open, setModal2Open] = useState(false);

  const history = useHistory();

  const handleClick = (e) => {
    e.stopPropagation();
    // history.push(`/offer-details/${offerId}/${sliceId}`);
  };
  return (
    <>
      <Col xs={24} sm={24} md={23} lg={24} className="flightDetails">
        <Col xs={24} sm={24} md={24} lg={20}>
          <div className="leftSection">
            <Col xs={24} sm={24} md={24} lg={2} className="flexColumn">
              <img
                src={
                  'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg'
                }
                style={{ height: 40, width: 40 }}
              />
              <div>
                <p
                  className="dullWhite"
                  style={{ fontSize: 12, marginLeft: 20 }}
                >
                  Basic- Duffel Airways
                </p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div className="cardFirstPart">
                {/* <span>{moment(fromDate).format('hh:m')}</span> */}
                <span>00:00</span>
                <Divider>
                  <img
                    src={planeImageBlack}
                    style={{ height: 20, width: 20 }}
                  />
                </Divider>
                <span>00:00</span>
                {/* <span>{moment(toDate).format('hh:m')}</span> */}
              </div>
              <div className="cardSecondPart dullWhite">
                <span>TT</span>
                {/* <span>{departureSub}</span> */}
                {/* ============DURATION============= */}
                <span>8 Hrs</span>
                {/* ============DURATION============= */}
                <span>TT</span>
                {/* <span>{destinationSub}</span> */}
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={2} className="placeCenter">
              <div className="stops">Non Stop</div>
            </Col>
          </div>

          <Col xs={24} sm={24} md={24} lg={4} className="lowerLeftSection">
            <Button className="mybutton" type="text" onClick={info}>
              Flight Details
            </Button>
            {/* <Modal
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <div>
                <h3 className="drawer-top-heading">Flight Details</h3>
                <h5> Friday, Mar 10</h5>
                <div>
                  <Timeline
                    className="info-timeline"
                    mode={'left'}
                    items={[
                      {
                        label: '03:14',
                        color: 'green',
                        children: (
                          <>
                            <p>city name</p>
                            <span>city code</span>
                          </>
                        ),
                      },
                      {
                        label: '4h',
                        color: 'gray',
                        children: (
                          <>
                            <p>plane Name</p>
                            <span>Operated by Duffle Airways</span>
                          </>
                        ),
                      },
                      {
                        label: '05:15',
                        color: 'green',
                        children: (
                          <>
                            <p>destination</p>
                            <span>destination code</span>
                          </>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </Modal> */}
          </Col>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} className="rightSection">
          <div className="alignitems">
            <h6>1200</h6>
            {/* <h6>Fare: ${fareAmount}</h6> */}
            <p className="alignContent">
              <LockFilled size={7} />
              Hold&nbsp;<a href="#">Price</a>&nbsp;&&nbsp;
              <a href="#">Specs</a>
            </p>
            <p className="alignContent">
              <CloudFilled size={7} />
              78kg
              <span>
                &nbsp;CO
                <sub>2</sub>
              </span>
            </p>
          </div>
          <Button className="bookButton" onClick={(e) => handleClick(e)}>
            Book Now
          </Button>
        </Col>
      </Col>
    </>
  );
};

export default FlightDetailCard;
