import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator }) => {
  return (
    <Breadcrumb separator={separator}>
      <Breadcrumb.Item>
        <Link to={'/'}>New</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
