/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import SignInPage from '../../page-objects/signin-page';
import NavBarPage from '../../page-objects/navbar-page';
// import RegisterPage from '../../page-objects/register-page';
// import PasswordPage from '../../page-objects/password-page';
// import SettingsPage from '../../page-objects/settings-page';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Account', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  const loginPageTitle = 'login-title';

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage(true);
    signInPage = navBarPage.getSignInPage();
    signInPage.waitUntilDisplayed();
  });

  it('should fail to login with bad password', async () => {
    // Login page should appear
    expect(await signInPage.getTitle()).to.eq(loginPageTitle);

    await signInPage.setUserName('admin');
    await signInPage.setPassword('foo');
    await signInPage.login();

    // Login page should stay open when login fails
    expect(await signInPage.getTitle()).to.eq(loginPageTitle);
  });

  it('should login with admin account', async () => {
    browser.get('/');
    signInPage = navBarPage.getSignInPage();
    signInPage.waitUntilDisplayed();
    // Login page should appear
    expect(await signInPage.getTitle()).to.eq(loginPageTitle);

    await signInPage.setUserName('admin');
    await signInPage.setPassword('admin');
    await signInPage.login();

    signInPage.waitUntilHidden();

    // Login page should close when login success
    expect(await signInPage.isHidden()()).to.be.true;
    navBarPage.autoSignOut();
  });
});
