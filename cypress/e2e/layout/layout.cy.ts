import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from '../../utils/graphql-test-utils';

context('Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4000/graphql', req => {
      // Queries
      aliasQuery(req, 'GetTasks');
      aliasQuery(req, 'GetUsers');

      // Mutations
      aliasMutation(req, 'CreateTask');
      aliasMutation(req, 'UpdateTask');
      aliasMutation(req, 'DeleteTask');
      aliasMutation(req, 'DeleteTasks');

      if (hasOperationName(req, 'GetUsers')) {
        req.reply({ fixture: 'getUsers.json' });
      }

      if (hasOperationName(req, 'GetTasks')) {
        req.reply({ fixture: 'getTasks.json' });
      }

      if (hasOperationName(req, 'CreateTask')) {
        req.reply({ fixture: 'createTask.json' });
      }

      if (hasOperationName(req, 'UpdateTask')) {
        req.reply({ fixture: 'updateTask.json' });
      }

      if (hasOperationName(req, 'DeleteTask')) {
        req.reply({ fixture: 'deleteTask.json' });
      }

      if (hasOperationName(req, 'DeleteTasks')) {
        req.reply({ fixture: 'deleteTasks.json' });
      }
    });

    cy.visit('/');
  });

  describe('Home Page', () => {
    it('successfully change pages', () => {
      cy.get('#datagrid-label-main').should('have.text', 'Manage Tasks');

      cy.visit('/users');

      cy.get('#datagrid-label-main').should('have.text', 'Manage Users');

      cy.visit('/');

      cy.get('#datagrid-label-main').should('have.text', 'Manage Tasks');
    });

    it('expands and contracts sidebar when clicking on menu button', () => {
      cy.get('.MuiTypography-body1').contains('Home').should('be.visible');
      cy.get('.MuiTypography-body1').contains('Users').should('be.visible');

      cy.get('#menuButton').click();

      cy.get('.MuiTypography-body1').contains('Home').should('not.be.visible');
      cy.get('.MuiTypography-body1').contains('Users').should('not.be.visible');

      cy.get('#menuButton').click();

      cy.get('.MuiTypography-body1').contains('Home').should('be.visible');
      cy.get('.MuiTypography-body1').contains('Users').should('be.visible');
    });

    it('should show menu when clicking avatar', () => {
      cy.get('#avatar').click();

      cy.get('.MuiTypography-body1')
        .contains('Logout')
        .should('be.visible')
        .click()
        .should('not.be.visible');
    });
  });
});
