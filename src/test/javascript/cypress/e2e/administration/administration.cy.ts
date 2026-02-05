import {
  entityConfirmDeleteButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
} from 'support/entity';

import {
  configurationPageHeadingSelector,
  healthPageHeadingSelector,
  logsPageHeadingSelector,
  metricsPageHeadingSelector,
  swaggerFrameSelector,
  swaggerPageSelector,
  userManagementPageHeadingSelector,
} from '../../support/commands';

describe('/admin', () => {
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';

  beforeEach(() => {
    cy.login(username, password);
    cy.visit('');
  });

  describe('/user-management', () => {
    it('should load the page', () => {
      cy.clickOnAdminMenuItem('user-management');
      cy.get(userManagementPageHeadingSelector).should('be.visible');
    });
    describe.skip('/user-management CRUD', () => {
      const userManagementPageUrlPattern = new RegExp('/admin/user-management(\\?.*)?$');
      const userManagementPageUrl = '/admin/user-management';
      let user;

      beforeEach(() => {
        cy.intercept('GET', '/api/admin/users+(?*|)').as('entitiesRequest');
        cy.intercept('POST', '/api/admin/users').as('postEntityRequest');
        cy.intercept('DELETE', '/api/admin/users/*').as('deleteEntityRequest');
      });

      afterEach(() => {
        if (user) {
          cy.authenticatedRequest({
            method: 'DELETE',
            url: `/api/admin/users/${user.id}`,
          }).then(() => {
            user = undefined;
          });
        }
      });

      describe('with existing value', () => {
        beforeEach(() => {
          const userSample = {
            login: `user${Math.floor(Math.random() * 1000000)}`,
            email: `user${Math.floor(Math.random() * 1000000)}@example.com`,
          };

          cy.authenticatedRequest({
            method: 'POST',
            url: '/api/admin/users',
            body: userSample,
            failOnStatusCode: false,
          })
            .then(({ status }) => {
              expect(status).to.be.oneOf([201, 500]);
              return cy.authenticatedRequest({
                method: 'GET',
                url: `/api/admin/users/${userSample.login}`,
              });
            })
            .then(({ body }) => {
              user = body;
              cy.intercept(
                {
                  method: 'GET',
                  url: '/api/admin/users+(?*|)',
                  times: 1,
                },
                {
                  statusCode: 200,
                  body: [user],
                },
              ).as('entitiesRequestInternal');
              cy.visit(userManagementPageUrl);
              cy.wait('@entitiesRequestInternal');
            });
        });

        it('detail button click should load details User page', () => {
          cy.get(entityDetailsButtonSelector).last().click();
          cy.getEntityDetailsHeading('userManagement');
          cy.get(entityDetailsBackButtonSelector).click();
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response?.statusCode).to.equal(200);
          });
          cy.url().should('match', userManagementPageUrlPattern);
        });

        it('edit button click should load edit User page and go back', () => {
          cy.get(entityEditButtonSelector).last().click();
          cy.getEntityCreateUpdateHeading('userManagement');
          cy.get(entityCreateSaveButtonSelector).should('exist');
          cy.get(entityCreateCancelButtonSelector).click();
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response?.statusCode).to.equal(200);
          });
          cy.url().should('match', userManagementPageUrlPattern);
        });

        it('edit button click should load edit User page and save', () => {
          cy.get(entityEditButtonSelector).last().click();
          cy.getEntityCreateUpdateHeading('userManagement');
          cy.get(entityCreateSaveButtonSelector).click();
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response?.statusCode).to.equal(200);
          });
          cy.url().should('match', userManagementPageUrlPattern);
        });

        it('last delete button click should delete instance of User', () => {
          cy.get(entityDeleteButtonSelector).last().click();
          cy.getEntityDeleteDialogHeading('userManagement').should('exist');
          cy.get(entityConfirmDeleteButtonSelector).click();
          cy.wait('@deleteEntityRequest').then(({ response }) => {
            expect(response?.statusCode).to.equal(204);
          });
          cy.wait('@entitiesRequest').then(({ response }) => {
            expect(response?.statusCode).to.equal(200);
          });
          cy.url().should('match', userManagementPageUrlPattern);

          user = undefined;
        });
      });
    });
  });

  describe('/metrics', () => {
    it('should load the page', () => {
      cy.clickOnAdminMenuItem('metrics');
      cy.get(metricsPageHeadingSelector).should('be.visible');
    });
  });

  describe('/health', () => {
    it('should load the page', () => {
      cy.clickOnAdminMenuItem('health');
      cy.get(healthPageHeadingSelector).should('be.visible');
    });
  });

  describe('/logs', () => {
    it('should load the page', () => {
      cy.clickOnAdminMenuItem('logs');
      cy.get(logsPageHeadingSelector).should('be.visible');
    });
  });

  describe('/configuration', () => {
    it('should load the page', () => {
      cy.clickOnAdminMenuItem('configuration');
      cy.get(configurationPageHeadingSelector).should('be.visible');
    });
  });

  describe('/docs', () => {
    it('should load the page', () => {
      cy.getManagementInfo().then(info => {
        if (info.activeProfiles.includes('api-docs')) {
          cy.clickOnAdminMenuItem('docs');
          cy.get(swaggerFrameSelector)
            .should('be.visible')
            .then(() => {
              // Wait iframe to load
              cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
              const getSwaggerIframe = () => {
                return cy.get(swaggerFrameSelector).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
              };
              getSwaggerIframe().find(swaggerPageSelector, { timeout: 15000 }).should('be.visible');
              getSwaggerIframe().find('[id="select"] > option').its('length').should('be.gt', 0);
              getSwaggerIframe().find(swaggerPageSelector).then(cy.wrap).find('.information-container').its('length').should('be.gt', 0);
            });
        }
      });
    });
  });
});
