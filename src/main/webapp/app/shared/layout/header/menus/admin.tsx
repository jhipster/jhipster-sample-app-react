import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

const adminMenuItems = (
  <>
    <DropdownItem tag={Link} to="/admin/user-management">
      <FontAwesomeIcon icon="user" /> User Management
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/metrics">
      <FontAwesomeIcon icon="tachometer-alt" /> Metrics
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/health">
      <FontAwesomeIcon icon="heart" /> Health
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/configuration">
      <FontAwesomeIcon icon="list" /> Configuration
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/audits">
      <FontAwesomeIcon icon="bell" /> Audits
    </DropdownItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    <DropdownItem tag={Link} to="/admin/logs">
      <FontAwesomeIcon icon="tasks" /> Logs
    </DropdownItem>
  </>
);

const swaggerItem = (
  <DropdownItem tag={Link} to="/admin/docs">
    <FontAwesomeIcon icon="book" /> API Docs
  </DropdownItem>
);

const databaseItem = (
  <DropdownItem tag="a" href="./h2-console" target="_tab">
    <FontAwesomeIcon icon="hdd" /> Database
  </DropdownItem>
);

export const AdminMenu = ({ showSwagger, showDatabase }) => (
  <NavDropdown icon="user-plus" name="Administration" style={{ width: '130%' }} id="admin-menu">
    {adminMenuItems}
    {showSwagger && swaggerItem}

    {showDatabase && databaseItem}
  </NavDropdown>
);

export default AdminMenu;
