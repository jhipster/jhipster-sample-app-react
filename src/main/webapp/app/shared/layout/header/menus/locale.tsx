import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from '../header-components';
import { locales } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }) =>
  locales.length > 1 && (
    <NavDropdown icon="flag" name={currentLocale.toUpperCase()}>
      {locales.map(lang => (
        <DropdownItem key={lang} value={lang} onClick={onClick}>
          {lang.toUpperCase()}
        </DropdownItem>
      ))}
    </NavDropdown>
  );
