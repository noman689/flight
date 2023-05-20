import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator }) => {
  const location = useLocation();
  console.log('lcoation:', location);
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('pasdas:', pathnames);
  return (
    <Breadcrumb separator={separator}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((pathname, index) => (
        <Breadcrumb.Item key={index}>
          <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>
            {pathname}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
