/// <reference types="cypress" />

beforeEach(() => {
  cy.clearLocalStorage();
  cy.getCurrentUser();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Address explore', () => {
  it('Should display details for the provided address.', () => {
    cy.fixture('example').then(({ address }) => {
      cy.exploreAddress(address);
    });
    cy.get('[data-cy=searchType]').contains('ADDRESS');
  });
});

describe('Address subscription', () => {
  it('Should subscribe to changes for the address, then find it in /subscriptions page.', () => {
    cy.fixture('example').then(({ address }) => {
      cy.exploreAddress(address);
    });

    cy.triggerSubscribe();

    cy.fixture('example').then(({ address }) => {
      cy.goToSubscriptions().then(() => {
        cy.findSubscription(address);
      });
    });
  });

  it('Should unsubscribe from changes for the address.', () => {
    cy.fixture('example').then(({ address }) => {
      cy.exploreAddress(address);
    });

    cy.triggerSubscribe();
  });
});
