import { Row, Col, Divider, Button } from 'antd';
import moment from 'moment';
// @ts-ignore
import planeImageBlack from '../../../assets/ticketBlack.svg';
import './FlightDetailCard.scss';
import { useHistory } from 'react-router-dom';
import { CloudFilled, LockFilled, LockOutlined } from '@ant-design/icons';

const FlightDetailCard = ({
  data
}) => {
  const history = useHistory();

  const handleClick = (e) => {
    e.stopPropagation();
    // history.push(`/offer-details/${offerId}/${sliceId}`);
  };
  return (
    <div className="flight-detail-card-item">
      <div className="flightDetails">
        <Col xs={24} sm={24} md={23} lg={24} style={{ padding: '20px' }}>
          <Row justify={'space-between'}>
            <Col xs={24} sm={24} md={24} lg={2} className="placeCenter">
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
            <Col xs={24} sm={24} md={24} lg={13}>
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
            <Col xs={24} sm={24} md={24} lg={4} className="placeCenter ">
              <div className="bookingButtons">
                <h6>1200</h6>
                {/* <h6>Fare: ${fareAmount}</h6> */}
                <div>
                  <p className="alignitems">
                    <LockFilled size={7} />
                    Hold&nbsp;<a href="#">Price</a>&nbsp;&&nbsp;
                    <a href="#">Specs</a>
                  </p>
                  <p className="alignitems">
                    <CloudFilled size={7} />
                    78kg
                    <span>
                      &nbsp;CO
                      <sub>2</sub>
                    </span>
                  </p>
                </div>
                <Button className="book-button" onClick={(e) => handleClick(e)}>
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
          <div className="flight-details">
            <h6>Flight Details</h6>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default FlightDetailCard;
