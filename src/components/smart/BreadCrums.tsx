import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator }) => {
  const [routes, setRoutes] = useState(['/']);
  const location = useLocation();
  const getPathName = (item) => {
    if (item=='/'){
      return 'Home'
    }
    if (item.includes('flight')) {
      return 'flight-details';
    }
    if (item.includes('offer')) {
      return 'offer-details';
    }
  };
  useEffect(() => {
    if (!routes.includes(location.pathname)) {
      setRoutes((prev) => [...prev,location.pathname]);
    }
  }, [location]);
  console.log('location.pathname', location.pathname);
  return (
    <Breadcrumb separator={separator}>
      {routes.map((item) => {
        return (
          <Breadcrumb.Item>
            <Link to={item}>{getPathName(item)}</Link>
          </Breadcrumb.Item>
        );
      })}
      {/* <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={location.pathname}>{getPathName(location.pathname)}</Link>
      </Breadcrumb.Item> */}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
