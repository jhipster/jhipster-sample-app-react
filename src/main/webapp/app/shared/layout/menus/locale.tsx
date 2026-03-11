import React from 'react';
import { DropdownItem } from 'react-bootstrap';

import { languages, locales } from 'app/config/translation';

import { NavDropdown } from './menu-components';

export const LocaleMenu = ({ currentLocale, onClick }: { currentLocale: string; onClick: (locale: string) => void }) =>
  Object.keys(languages).length > 1 && (
    <NavDropdown icon="flag" name={currentLocale ? languages[currentLocale].name : undefined}>
      {locales.map(locale => (
        <DropdownItem key={locale} eventKey={locale} onClick={() => onClick(locale)}>
          {languages[locale].name}
        </DropdownItem>
      ))}
    </NavDropdown>
  );
