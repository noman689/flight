import { Card, Col, Row } from 'antd';
import React from 'react';
import './DisplayCards.scss';
interface CardData {
  id: number;
  imageUrl: string;
  link: string;
  title: string;
  description: string;
}

interface Props {
  cards: CardData[];
}

const DisplayCards: React.FC<Props> = ({ cards }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={14}>
        <Card
          hoverable
          cover={
            <img
              alt="card image"
              src="https://mmnews.tv/wp-content/uploads/2022/08/Qatar.jpg"
            />
          }
        >
          <Card.Meta
            title={cards[0].title}
            description={cards[0].description}
          />
          <a href={cards[0].link}>Book Now</a>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={5} style={{ height: '800px' }}>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={
            <img
              alt="card image"
              src="https://mmnews.tv/wp-content/uploads/2022/08/Qatar.jpg"
            />
          }
        >
          <Card.Meta
            title={cards[1].title}
            description={cards[1].description}
          />
          <a href={cards[1].link}>Purchase Add ons</a>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={5}>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<img alt="card image" src={cards[2].imageUrl} />}
        >
          <Card.Meta
            title={cards[2].title}
            description={cards[2].description}
          />
          <a href={cards[2].link}>Find Out More</a>
        </Card>
        <Card
          hoverable
          style={{ width: '100%', marginTop: '16px' }}
          cover={<img alt="card image" src={cards[3].imageUrl} />}
        >
          <Card.Meta
            title={cards[3].title}
            description={cards[3].description}
          />
          <a href={cards[3].link}>Find Flights and fares</a>
        </Card>
      </Col>
    </Row>

    // custom cards

    // <Row gutter={[16, 16]} justify={'center'}>
    //   <Col xs={24} sm={24} md={10}>
    //     <div className="card card-1">
    //       <div className="card-content">
    //         <h3>Promotion 1</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //       </div>
    //     </div>
    //   </Col>
    //   <Col xs={24} sm={24} md={7}>
    //     <div className="card card-1">
    //       <div className="card-content">
    //         <h3>Promotion 1</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //       </div>
    //     </div>
    //   </Col>
    //   <Col xs={24} sm={24} md={7}>
    //     <Row>
    //       <div className="card card-1">
    //         <div className="card-content">
    //           <h3>Promotion 1</h3>
    //           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //         </div>
    //       </div>
    //     </Row>
    //     <Row>
    //       <div className="card card-1">
    //         <div className="card-content">
    //           <h3>Promotion 1</h3>
    //           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //         </div>
    //       </div>
    //     </Row>
    //   </Col>
    // </Row>
  );
};

export default DisplayCards;
