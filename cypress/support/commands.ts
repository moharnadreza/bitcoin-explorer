import 'cypress-localstorage-commands';
import { nanoid } from 'nanoid';
import { USER_KEY } from 'utils/getCurrentUser';

Cypress.Commands.add('getCurrentUser', () => {
  cy.getLocalStorage(USER_KEY).then((userID) => {
    if (!userID) {
      const generatedUserID = nanoid(10);
      cy.setLocalStorage(USER_KEY, generatedUserID);
    }
  });
});

Cypress.Commands.add('exploreAddress', (address: string) => {
  cy.visit('/');
  cy.get('[data-cy=searchQuery]').focus().type(address);
  cy.get('[data-cy=submit]').click();
});

Cypress.Commands.add('exploreTransaction', (address: string) => {
  cy.visit('/');
  cy.get('[data-cy=searchQuery]').focus().type(address);
  cy.get('[data-cy=submit]').click();
});

Cypress.Commands.add('triggerSubscribe', () => {
  cy.get('[data-cy=subscribe]').click();
  cy.get('.toast').contains('Subscription updated successfully.');
});

Cypress.Commands.add('goToSubscriptions', () => {
  cy.get('[data-cy=subscriptions]')
    .click()
    .then(() => {
      cy.url().should('contain', '/subscriptions');
    });
});

Cypress.Commands.add('findSubscription', (hash: string) => {
  cy.get('[data-cy=subscriptionsList]').contains(hash);
});
