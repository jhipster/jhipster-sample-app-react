import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('UserManagement e2e test', () => {
  const userManagementPageUrl = '/admin/user-management';
  const userManagementPageUrlPattern = new RegExp('/admin/user-management(\\?.*)?$');
  let username: string;
  let password: string;
  const userManagementSample = { login: 'Gwen.Koelpin', email: 'Keira_Gibson71@gmail.com' };

  let userManagement;

  before(() => {
    cy.credentials().then(credentials => {
      ({ adminUsername: username, adminPassword: password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/admin/users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/admin/users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/admin/users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (userManagement) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/admin/users/${userManagement.login}`,
      }).then(() => {
        userManagement = undefined;
      });
    }
  });

  it('UserManagements menu should load UserManagements page', () => {
    cy.visit('/');
    cy.clickOnAdminMenuItem('admin/user-management');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('UserManagement').should('exist');
    cy.url().should('match', userManagementPageUrlPattern);
  });

  describe('UserManagement page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(userManagementPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create UserManagement page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/admin/user-management/new$'));
        cy.getEntityCreateUpdateHeading('UserManagement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userManagementPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/admin/users',
          body: userManagementSample,
        }).then(({ body }) => {
          userManagement = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/admin/users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/admin/users?page=0&size=20>; rel="last",<http://localhost/api/admin/users?page=0&size=20>; rel="first"',
              },
              body: [userManagement],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(userManagementPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details UserManagement page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('userManagement');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userManagementPageUrlPattern);
      });

      it('edit button click should load edit UserManagement page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UserManagement');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userManagementPageUrlPattern);
      });

      it('edit button click should load edit UserManagement page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UserManagement');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userManagementPageUrlPattern);
      });

      it('last delete button click should delete instance of UserManagement', () => {
        cy.intercept('GET', '/api/admin/users/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('userManagement').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', userManagementPageUrlPattern);

        userManagement = undefined;
      });
    });
  });

  describe.skip('new UserManagement page', () => {
    beforeEach(() => {
      cy.visit(userManagementPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('UserManagement');
    });

    it('should create an instance of UserManagement', () => {
      cy.get(`[data-cy="login"]`).type('Homer_Wilderman');
      cy.get(`[data-cy="login"]`).should('have.value', 'Homer_Wilderman');

      cy.get(`[data-cy="firstName"]`).type('Gail');
      cy.get(`[data-cy="firstName"]`).should('have.value', 'Gail');

      cy.get(`[data-cy="lastName"]`).type('Bashirian');
      cy.get(`[data-cy="lastName"]`).should('have.value', 'Bashirian');

      cy.get(`[data-cy="email"]`).type('Ned54@yahoo.com');
      cy.get(`[data-cy="email"]`).should('have.value', 'Ned54@yahoo.com');

      cy.get(`[data-cy="langKey"]`).select('en');

      cy.get(`[data-cy="activated"]`).should('not.be.checked');
      cy.get(`[data-cy="activated"]`).click();
      cy.get(`[data-cy="activated"]`).should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        userManagement = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', userManagementPageUrlPattern);
    });
  });
});
