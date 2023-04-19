import { ArrowRightOutlined, TranslationOutlined } from '@ant-design/icons';
import { getStops } from '@client/utils/helper';
import { Modal, Tabs, Timeline } from 'antd';
import moment from 'moment';
import React from 'react';
import './FlightInfoModal.scss';

const FlightInfoModal = ({ show, setShow, data }) => {
  const getTimeLine = (payload) => {
    const stops = getStops(payload.segments, true).stops;
    let itemsArray = [];
    for (let i = 0; i < payload.segments.length; i++) {
      if (i >= 1) {
        itemsArray.push({
          color: 'gray',
          children: <div className="stop-section">{stops[i - 1][i - 1]}</div>,
        });
      }
      itemsArray.push({
        color: 'green',
        children: (
          <>
            <p>
              {payload.segments[i].origin.name}{' '}
              {`(${payload.segments[i].origin.iata_code})`}
            </p>
            <span>
              {moment(payload.segments[i].departing_at).format(
                'YYYY-MM-DD hh:mm:s a',
              )}
            </span>
          </>
        ),
      });
      itemsArray.push({
        color: 'green',
        children: (
          <>
            <p>
              {payload.segments[i].destination.name}{' '}
              {`(${payload.segments[i].destination.iata_code})`}
            </p>
            <span>
              {moment(payload.segments[i].arriving_at).format(
                'YYYY-MM-DD hh:mm:s a',
              )}
            </span>
          </>
        ),
      });
    }
    return (
      <Timeline
        className="info-timeline"
        mode={'left'}
        items={[...itemsArray]}
      />
    );
  };

  const item =
    data.slices.length > 1
      ? [
          {
            label: (
              <span className="heading-color">
                {data.slices[1].origin.iata_code}
                <ArrowRightOutlined />
                {data.slices[1].destination.iata_code}
              </span>
            ),
            key: 'first',
            children: getTimeLine(data.slices[1]),
          },
          {
            label: (
              <span className="heading-color">
                {data.slices[0].origin.iata_code}
                <ArrowRightOutlined />
                {data.slices[0].destination.iata_code}
              </span>
            ),
            key: 'second',
            children: getTimeLine(data.slices[0]),
          },
        ]
      : [
          {
            label: (
              <span className="heading-color">
                {data.slices[0].origin.iata_code}
                <ArrowRightOutlined />
                {data.slices[0].destination.iata_code}
              </span>
            ),
            key: 'second',
            children: getTimeLine(data.slices[0]),
          },
        ];
  return (
    <Modal
      open={show}
      onCancel={() => setShow(false)}
      footer={null}
      className="modal-tabs"
      closable={false}
      width={'550px'}
    >
      <Tabs
        type="card"
        defaultActiveKey="first"
        items={item}
        tabPosition="top"
      />
    </Modal>
  );
};

export default FlightInfoModal;
