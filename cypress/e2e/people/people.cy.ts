import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from '../../utils/graphql-test-utils';

context('Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4000/graphql', req => {
      // Queries
      aliasQuery(req, 'GetUsers');

      // Mutations
      aliasMutation(req, 'CreateUser');
      aliasMutation(req, 'UpdateUser');
      aliasMutation(req, 'DeleteUser');
      aliasMutation(req, 'DeleteUsers');

      if (hasOperationName(req, 'GetUsers')) {
        req.reply({ fixture: 'getUsers.json' });
      }

      if (hasOperationName(req, 'CreateUser')) {
        req.reply({ fixture: 'createUser.json' });
      }

      if (hasOperationName(req, 'UpdateUser')) {
        req.reply({ fixture: 'updateUser.json' });
      }

      if (hasOperationName(req, 'DeleteUser')) {
        req.reply({ fixture: 'deleteUser.json' });
      }

      if (hasOperationName(req, 'DeleteUsers')) {
        req.reply({ fixture: 'deleteUsers.json' });
      }
    });

    cy.visit('/people');
  });

  describe('People Page', () => {
    it('successfully loads', () => {
      cy.get('#datagrid-label-main').should('have.text', 'Manage People');
    });

    describe('Add Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('.MuiButton-textError').contains('Cancel').click();
        cy.get('#draggable-dialog-title').should('not.exist');
      });
      it('should not add person with missing fields', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[form="add-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 3);
      });
      it('should not add person when email is in incorrect format', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[name="name"]').type('User12');
        cy.get('[name="role"]').type('Role12');
        cy.get('[name="email"]').type('email12');
        cy.get('[form="add-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 1);
      });
      it('should add person when input is correct', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[name="name"]').type('User12');
        cy.get('[name="role"]').type('Role12');
        cy.get('[name="email"]').type('email12@email.com');
        cy.get('[form="add-form-id"]').click();
        cy.wait('@gqlCreateUserMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.name).to.be.eql('User12');
            expect(input.role).to.be.eql('Role12');
            expect(input.email).to.be.eql('email12@email.com');
          });

        cy.wait('@gqlGetUsersQuery');
      });
    });

    describe('Edit Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiButton-textError').contains('Cancel').click();

        cy.get('#draggable-dialog-title').should('not.exist');
      });

      it('should load previous values', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="name"]').should('have.value', 'User1');
        cy.get('[name="role"]').should('have.value', 'Role1');
        cy.get('[name="email"]').should('have.value', 'email1@email.com');
      });

      it('should not edit person if you leave missing fields', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="name"]').clear();
        cy.get('[name="role"]').clear();
        cy.get('[name="email"]').clear();

        cy.get('[form="edit-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 3);
      });

      it('should not edit person if you input wrong email', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="email"]').clear().type('newemail');

        cy.get('[form="edit-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 1);
      });

      it('should edit person when input is correct', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="email"]').clear().type('email12@email.com');

        cy.get('[form="edit-form-id"]').click();

        cy.wait('@gqlUpdateUserMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.id).not.to.be.undefined;
            expect(input.name).to.be.eql('User1');
            expect(input.role).to.be.eql('Role1');
            expect(input.email).to.be.eql('email12@email.com');
          });

        cy.wait('@gqlGetUsersQuery');
      });
    });

    describe('Delete Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('[aria-label="Delete"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiButton-textError').contains('Cancel').click();

        cy.get('#draggable-dialog-title').should('not.exist');
      });

      it('should delete person when clicking on Confirm', () => {
        cy.get('[aria-label="Delete"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiLoadingButton-root').contains('Confirm').click();

        cy.wait('@gqlDeleteUserMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.id).not.to.be.undefined;
          });

        cy.wait('@gqlGetUsersQuery');
      });
    });

    describe('Delete Multiple Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('[aria-label="Delete"]').first().should('be.visible');
        cy.get('[aria-label="Select all rows"]').click();
        cy.get('#datagrid-button-delete').click();

        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiButton-textError').contains('Cancel').click();

        cy.get('#draggable-dialog-title').should('not.exist');
      });

      it('should delete several people when clicking on Confirm', () => {
        cy.get('[aria-label="Delete"]').first().should('be.visible');
        cy.get('[aria-label="Select all rows"]').click();
        cy.get('#datagrid-button-delete').click();

        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiLoadingButton-root').contains('Confirm').click();

        cy.wait('@gqlDeleteUsersMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.ids).not.to.be.undefined;
          });

        cy.wait('@gqlGetUsersQuery');
      });
    });
  });
});
