import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import FlightDetail from '../smart/FlightDetails/FlightDetail';
import './MainLayout.scss';
import PassengerDetailsPage from '../smart/PassengerDetails/PassengerDetailsPage';
import HomePage from '../smart/HomePage/HomePage';
import SeatSelectionComp from '../smart/SeatSelection/SeatSelection';
import PaymentMethod from '../smart/PaymentMethod/PaymentMethod';
import FlightTicket from '../smart/FlightTicket/FlightTicket';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Breadcrumbs from '../smart/BreadCrums';
import { useEffect, useState } from 'react';
import PrivateRouter from '../HOC/PrivateRouter/PrivateRouter';
import { useDispatch } from 'react-redux';
import { VerifyUserAPI } from '@client/services/authService';
import {
  LoginFail,
  LoginSuccess,
  removeProfile,
  setProfile,
} from '@client/store/auth/authActions';
import Spin from '../presentational/Spin';

const { Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('duffel-token');
        if (token) {
          const user = await VerifyUserAPI();
          if (user) {
            dispatch(LoginSuccess());
            dispatch(setProfile(user?.data?.data));
          } else {
            localStorage.removeItem('duffel-token');
            dispatch(LoginFail());
            dispatch(removeProfile());
          }
        } else {
          localStorage.removeItem('duffel-token');
          dispatch(LoginFail());
          dispatch(removeProfile());
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Layout className="bg-cloud">
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <Router>
          <Content>
            <div
              style={{
                top: 30,
                left: 30,
                position: 'absolute',
              }}
            >
              <Breadcrumbs />
            </div>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route
                exact
                path="/flight-details/:id"
                component={FlightDetail}
              />
              <Redirect exact from="/" to="/home" />
              <PrivateRouter path="/">
                <Route
                  exact
                  path="/offer-details/:id"
                  component={PassengerDetailsPage}
                />
                <Route
                  exact
                  path="/seat-selection/:id"
                  component={SeatSelectionComp}
                />
                <Route exact path="/payment-method" component={PaymentMethod} />
                <Route exact path="/flight-ticket" component={FlightTicket} />
              </PrivateRouter>
            </Switch>
          </Content>
        </Router>
      )}
    </Layout>
  );
};

export default MainLayout;
