import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from '../header-components';
import { languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }) =>
  Object.keys(languages).length > 1 && (
    <NavDropdown icon="flag" name={currentLocale ? languages[currentLocale].name : undefined}>
      {Object.keys(languages)
        .sort()
        .map(lang => (
          <DropdownItem key={lang} value={lang} onClick={onClick}>
            {languages[lang].name}
          </DropdownItem>
        ))}
    </NavDropdown>
  );
