import React from 'react';
import { shallow } from 'enzyme';

import sinon from 'sinon';

import LoadingBar from 'react-redux-loading-bar';
import { Navbar, Nav } from 'reactstrap';

import { Home, Brand } from 'app/shared/layout/header/header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from 'app/shared/layout/header/menus';
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

  const userWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(
        <Header
          isAuthenticated
          isAdmin={false}
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

  const guestWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(
        <Header
          isAuthenticated={false}
          isAdmin={false}
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
    expect(devWrapper().find(LoadingBar).length).toEqual(1);
    const navbar = devWrapper().find(Navbar);
    expect(navbar.length).toEqual(1);
    expect(navbar.find(Brand).length).toEqual(1);
    const nav = devWrapper().find(Nav);
    expect(nav.length).toEqual(1);
    expect(nav.find(Home).length).toEqual(1);
    expect(nav.find(AdminMenu).length).toEqual(1);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    expect(nav.find(LocaleMenu).length).toEqual(1);

    expect(nav.find(AccountMenu).length).toEqual(1);
    const ribbon = devWrapper().find('.ribbon .dev');
    expect(ribbon.length).toEqual(1);
  });

  it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
    const navbar = prodWrapper().find(Navbar);
    expect(navbar.length).toEqual(1);
    expect(navbar.find(Brand).length).toEqual(1);
    const nav = prodWrapper().find(Nav);
    expect(nav.length).toEqual(1);
    expect(nav.find(Home).length).toEqual(1);
    expect(nav.find(AdminMenu).length).toEqual(1);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    expect(nav.find(LocaleMenu).length).toEqual(1);

    expect(nav.find(AccountMenu).length).toEqual(1);
    const ribbon = prodWrapper().find('.ribbon .dev');
    expect(ribbon.length).toEqual(0);
  });

  it('Renders a Header component in prod profile with logged in User', () => {
    const nav = userWrapper().find(Nav);
    expect(nav.find(AdminMenu).length).toEqual(0);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    const account = nav.find(AccountMenu);
    expect(account.first().props().isAuthenticated).toEqual(true);
  });

  it('Renders a Header component in prod profile with no logged in User', () => {
    const nav = guestWrapper().find(Nav);
    expect(nav.find(AdminMenu).length).toEqual(0);
    expect(nav.find(EntitiesMenu).length).toEqual(0);
    const account = nav.find(AccountMenu);
    expect(account.length).toEqual(1);
    expect(account.first().props().isAuthenticated).toEqual(false);
  });
});
