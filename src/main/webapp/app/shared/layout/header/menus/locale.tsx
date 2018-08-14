import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from '../header-components';
import { locales, languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }) =>
  Object.keys(languages).length > 1 && (
    <NavDropdown icon="flag" name={currentLocale ? languages[currentLocale].name : undefined}>
      {locales.map(locale => (
        <DropdownItem key={locale} value={locale} onClick={onClick}>
          {languages[locale].name}
        </DropdownItem>
      ))}
    </NavDropdown>
  );
