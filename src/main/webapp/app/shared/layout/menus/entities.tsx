import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/bank-account">
      <Translate contentKey="global.menu.entities.bankAccount" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/label">
      <Translate contentKey="global.menu.entities.label" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/operation">
      <Translate contentKey="global.menu.entities.operation" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
