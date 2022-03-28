/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getCurrentUser(): Chainable<Element>;
    exploreAddress(address: string): Chainable<Element>;
    exploreTransaction(hash: string): Chainable<Element>;
    triggerSubscribe(): Chainable<Element>;
    goToSubscriptions(): Chainable<Element>;
    findSubscription(hash: string): Chainable<Element>;
  }
}
