import { MenuOutlined } from '@ant-design/icons';
import AnimatedLoader from '@client/components/presentational/AnimatedLoader/AnimatedLoader';
import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Row } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FilterSidebar from '../FilterSideBar/FilterSidebar';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';
import './FlightDetail.scss';

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(
    window.innerWidth < 821 ? true : false,
  );
  const params = useParams();
  // @ts-ignore
  const { id } = params;
  const getOfers = async (after?: any,before?:any) => {
    try {
      setLoading(true);
      const { data } = await getFlightOffersAPI(id, after,before);
      setOffersArray(data);

      setLoading(false);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOfers();
  }, [id]);
  const toggle = () => {
    setCollapsed((prevState) => !prevState);
  };
  console.log('offersArray', offersArray);

  return (
    <div className="main_page_width m-b-30 date-tabs overflow-unset">
      {loading ? (
        <Row justify="center">
          {/* <Spin /> */}
          <AnimatedLoader />
        </Row>
      ) : (
        <>
          {window.innerWidth < 821 ? (
            <div onClick={toggle}>
              <MenuOutlined
                className="trigger"
                style={{ marginRight: '5px' }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex">
            <FilterSidebar
              data={offersArray?.offer?.data}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            <div className="cards-section">
              {!isEmpty(offersArray?.offer?.data) &&
                offersArray?.offer?.data?.map((offer) => {
                  return <FlightDetailCard data={offer}></FlightDetailCard>;
                })}
              <div>
                {offersArray?.offer?.meta?.after && (
                  <button
                    onClick={() => getOfers(offersArray?.offer?.meta?.after,offersArray?.offer?.meta?.before)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightDetail;
