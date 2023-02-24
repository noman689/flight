import React from 'react'
import { Layout} from 'antd';
import SearchFlightCard from '../smart/SearchFlightCard/BookingCard';
import HeaderComponent from './Header';
import TestFooter from './Footer';
import './MainLayout.scss'
const {Content} = Layout;

const MainLayout = () => {
  return (  

    <Layout>
      <HeaderComponent/>
      <Content>
          <SearchFlightCard/>
      </Content>
      <TestFooter/>
    </Layout>

  )
}


export default MainLayout
