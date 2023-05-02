import { MenuOutlined } from '@ant-design/icons';
import AnimatedLoader from '@client/components/presentational/AnimatedLoader/AnimatedLoader';
import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Row } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
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
  const history = useHistory();
  // @ts-ignore
  const { id } = params;
  const getOfers = async (after?: any, before?: any) => {
    try {
      setLoading(true);
      const { data } = await getFlightOffersAPI(id, undefined, undefined);
      setOffersArray(data);

      setLoading(false);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };
  useEffect(() => {
    const searchParams = window.location.href?.split('?')?.[1];
    console.log('searchParams', searchParams);
    if (searchParams?.length) {
      searchParams.split('=')[0] == 'after'
        ? getOfers(searchParams.split('=')[1], undefined)
        : searchParams.split('=')[0] == 'before'
        ? getOfers(undefined, searchParams.split('=')[1])
        : null;
    } else {
      getOfers(undefined, undefined);
    }
  }, [id, window.location.href]);
  const toggle = () => {
    setCollapsed((prevState) => !prevState);
  };
  console.log('offersArray', offersArray);

  return (
    <div className="main_page_width m-b-30 date-tabs overflow-unset">
      {loading ? (
        <Row justify="center">
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
              <div className="page-btns">
                {offersArray?.offer?.meta?.before && (
                  <span
                    className="page-navigate-btn previous-btn"
                    onClick={() => {
                      history.push({
                        pathname: window.location.pathname,
                        search: `?before=${offersArray?.offer?.meta?.before}`,
                      });
                    }}
                  >
                    Previous
                  </span>
                )}
                {offersArray?.offer?.meta?.after && (
                  <span
                    className="page-navigate-btn next-btn"
                    onClick={() => {
                      history.push({
                        pathname: window.location.pathname,
                        search: `?after=${offersArray?.offer?.meta?.after}`,
                      });
                    }}
                  >
                    Next
                  </span>
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
