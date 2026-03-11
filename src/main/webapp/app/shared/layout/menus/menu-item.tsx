import React from 'react';
import { DropdownItem } from 'react-bootstrap';
import { NavLink as Link } from 'react-router';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IMenuItem {
  children: React.ReactNode;
  icon: IconProp;
  to: string;
  id?: string;
  'data-cy'?: string;
}

const MenuItem = (props: IMenuItem) => {
  const { to, icon, id, children } = props;

  return (
    <DropdownItem as={Link as any} to={to} id={id} data-cy={props['data-cy']}>
      <FontAwesomeIcon icon={icon} /> {children}
    </DropdownItem>
  );
};

export default MenuItem;
