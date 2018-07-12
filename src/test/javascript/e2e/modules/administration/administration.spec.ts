/* tslint:disable no-unused-expression */
import { element, by, browser } from 'protractor';

import NavBarPage from '../../page-objects/navbar-page';
import { waitUntilDisplayed } from '../../util/utils';

const expect = chai.expect;

describe('Administration', () => {
  let navBarPage: NavBarPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage(true);
    navBarPage.autoSignIn();
  });

  describe('User management', () => {
    it('should load user management', async () => {
      navBarPage.clickOnAdminMenuItem('user-management');
      // Title should be equal to 'Users'
      expect(await element(by.className('userManagement-page-heading')).isPresent()).to.be.true;
    });
  });

  it('should load metrics', async () => {
    navBarPage.clickOnAdminMenuItem('metrics');
    waitUntilDisplayed(element(by.className('metrics-page-heading')));
    expect(await element(by.className('metrics-page-heading')).getText()).to.eq('Application Metrics');
  });

  it('should load health', async () => {
    navBarPage.clickOnAdminMenuItem('health');
    expect(await element(by.className('health-page-heading')).getText()).to.eq('Health Checks');
  });

  it('should load configuration', async () => {
    navBarPage.clickOnAdminMenuItem('configuration');
    expect(await element(by.className('configuration-page-heading')).getText()).to.eq('Configuration');
  });

  it('should load audits', async () => {
    navBarPage.clickOnAdminMenuItem('audits');
    expect(await element(by.className('audits-page-heading')).getText()).to.eq('Audits');
  });

  it('should load logs', async () => {
    navBarPage.clickOnAdminMenuItem('logs');
    expect(await element(by.className('logs-page-heading')).getText()).to.eq('Logs');
  });

  after(() => navBarPage.autoSignOut());
});
