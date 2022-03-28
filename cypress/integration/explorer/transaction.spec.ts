/// <reference types="cypress" />

beforeEach(() => {
  cy.clearLocalStorage();
  cy.getCurrentUser();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Transaction explore', () => {
  it('Should display details for the provided transaction hash.', () => {
    cy.fixture('example').then(({ transaction }) => {
      cy.exploreTransaction(transaction);
    });
    cy.get('[data-cy=searchType]').contains('TRANSACTION');
  });
});

describe('Transaction subscription', () => {
  it('Should subscribe to changes for the transaction hash, then find it in /subscriptions page.', () => {
    cy.fixture('example').then(({ transaction }) => {
      cy.exploreTransaction(transaction);
    });

    cy.triggerSubscribe();

    cy.fixture('example').then(({ transaction }) => {
      cy.goToSubscriptions().then(() => {
        cy.findSubscription(transaction);
      });
    });
  });

  it('Should unsubscribe from changes for the transaction.', () => {
    cy.fixture('example').then(({ transaction }) => {
      cy.exploreTransaction(transaction);
    });

    cy.triggerSubscribe();
  });
});
