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
    it('successfully loads', () => {
      cy.get('#datagrid-label-main').should('have.text', 'Manage Tasks');
    });

    describe('Add Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('.MuiButton-textError').contains('Cancel').click();
        cy.get('#draggable-dialog-title').should('not.exist');
      });
      it('should not add task with missing fields', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[form="add-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 2);
      });
      it('should not add task when due date or start date is in incorrect format', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[name="startDateCheckbox"]').click();
        cy.get('#startDate').type('Not a Date');
        cy.get('#dueDate').clear().type('Not a Date');
        cy.get('[form="add-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 4);
      });
      it('should add task when input is correct', () => {
        cy.get('#datagrid-button-add').click();
        cy.get('#draggable-dialog-title').should('be.visible');
        cy.get('[name="taskName"').type('Task12');
        cy.get('#person')
          .parent()
          .click()
          .get('ul > li[data-value="9b11baa2-250c-4dbd-9b2a-7ae2545dc125"]')
          .click();
        cy.get('[form="add-form-id"]').click();
        cy.wait('@gqlCreateTaskMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.taskName).to.be.eql('Task12');
            expect(input.description).to.be.eql('');
            expect(input.userId).not.to.be.undefined;
            expect(input.startDate).to.be.null;
            expect(input.dueDate).not.to.be.undefined;
            expect(input.completed).to.be.false;
          });
        cy.wait('@gqlGetTasksQuery');
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

        cy.get('[name="taskName"').should('have.value', 'Task1');
        cy.get('[name="description"').should('have.value', '');
        cy.get('[name="userId"').invoke('val').should('not.be.empty');
        cy.get('#dueDate').invoke('val').should('not.be.empty');
      });

      it('should not edit task if you leave missing fields', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="taskName"').clear();

        cy.get('[form="edit-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 1);
      });

      it('should not edit task if you input wrong date', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('#dueDate').clear().type('Not a Date');

        cy.get('[form="edit-form-id"]').click();
        cy.get('.MuiFormHelperText-root').should('have.length', 1);
      });

      it('should edit task when input is correct', () => {
        cy.get('[aria-label="Edit"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('[name="taskName"]').clear().type('Task12');
        cy.get('[name="completed"][value="true"]').click();

        cy.get('[form="edit-form-id"]').click();

        cy.wait('@gqlUpdateTaskMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.id).not.to.be.undefined;
            expect(input.taskName).to.be.eql('Task12');
            expect(input.completed).to.be.true;
          });

        cy.wait('@gqlGetTasksQuery');
      });
    });

    describe('Delete Dialog', () => {
      it('should close dialog when clicking on cancel', () => {
        cy.get('[aria-label="Delete"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiButton-textError').contains('Cancel').click();

        cy.get('#draggable-dialog-title').should('not.exist');
      });

      it('should delete task when clicking on Confirm', () => {
        cy.get('[aria-label="Delete"]').first().click();
        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiLoadingButton-root').contains('Confirm').click();

        cy.wait('@gqlDeleteTaskMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.id).not.to.be.undefined;
          });

        cy.wait('@gqlGetTasksQuery');
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

      it('should delete several tasks when clicking on Confirm', () => {
        cy.get('[aria-label="Delete"]').first().should('be.visible');
        cy.get('[aria-label="Select all rows"]').click();
        cy.get('#datagrid-button-delete').click();

        cy.get('#draggable-dialog-title').should('be.visible');

        cy.get('.MuiLoadingButton-root').contains('Confirm').click();

        cy.wait('@gqlDeleteTasksMutation')
          .its('request.body.variables.input')
          .should(input => {
            expect(input.ids).not.to.be.undefined;
          });

        cy.wait('@gqlGetTasksQuery');
      });
    });
  });
});
