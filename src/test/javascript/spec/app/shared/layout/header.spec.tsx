import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import * as sinon from 'sinon';

import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';

import Header from 'app/shared/layout/header/header';

describe('Header', () => {
  let mountedWrapper;

  const localeSpy = sinon.spy();

  const devWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(
        <Header
          isAuthenticated
          isAdmin
          currentLocale="en"
          onLocaleChange={localeSpy}
          ribbonEnv="dev"
          isInProduction={false}
          isSwaggerEnabled
        />
      );
    }
    return mountedWrapper;
  };
  const prodWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(
        <Header
          isAuthenticated
          isAdmin
          currentLocale="en"
          onLocaleChange={localeSpy}
          ribbonEnv="prod"
          isInProduction
          isSwaggerEnabled={false}
        />
      );
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here
  it('Renders a Header component in dev profile with LoadingBar, Navbar, Nav and dev ribbon.', () => {
    const navbar = devWrapper().find(Navbar);
    expect(navbar.length).to.equal(1);
    expect(navbar.find(NavbarBrand).find('.brand-logo').length).to.equal(1);
    const nav = devWrapper().find(Nav);
    expect(nav.length).to.equal(1);
    expect(nav.find(NavItem).length).to.equal(1);
    const ribbon = devWrapper().find('.ribbon .dev');
    expect(ribbon.length).to.equal(1);
  });

  it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
    const navbar = prodWrapper().find(Navbar);
    expect(navbar.length).to.equal(1);
    expect(navbar.find(NavbarBrand).find('.brand-logo').length).to.equal(1);
    const nav = prodWrapper().find(Nav);
    expect(nav.length).to.equal(1);
    expect(nav.find(NavItem).length).to.equal(1);
    const ribbon = prodWrapper().find('.ribbon .dev');
    expect(ribbon.length).to.equal(0);
  });
});
