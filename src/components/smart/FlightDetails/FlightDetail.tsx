import { MenuOutlined } from '@ant-design/icons';
import AnimatedLoader from '@client/components/presentational/AnimatedLoader/AnimatedLoader';
import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Row } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import FilterSidebar from '../FilterSideBar/FilterSidebar';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';
import './FlightDetail.scss';
import { useLocation, useHistory, useParams } from 'react-router-dom';

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState('');
  const [before, setBefore] = useState('');

  const [collapsed, setCollapsed] = useState(
    window.innerWidth < 821 ? true : false,
  );
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

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
  function handleNextClick() {
    const newAfter = Math.random().toString(36).substr(2, 9);
    setAfter(newAfter);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('after', newAfter);
    history.push({ search: searchParams.toString() });
  }

  function handlePreviousClick() {
    const newBefore = Math.random().toString(36).substr(2, 9);
    setBefore(newBefore);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('before', newBefore);
    history.push({ search: searchParams.toString() });
  }
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
                    onClick={() => handlePreviousClick()}
                  >
                    Previous
                  </span>
                )}
                {offersArray?.offer?.meta?.after && (
                  <span
                    className="page-navigate-btn next-btn"
                    onClick={() => handleNextClick()}
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
