/// <reference types="cypress" />

describe('Season page', () => {
  it('Enters Season page', function() {
      cy.visit('/')
      cy.get('[href="/all-seasons"]').click();
      cy.get('#app-desktop-container .all-seasons-desktop-buttons div:nth-child(2)').click();
      cy.get('#app-desktop-container .all-seasons-desktop-buttons div:nth-child(2)').click();
      cy.get('#app-desktop-container [href="/season/2017"]').click();
      cy.get('#home-desktop-menu-item-button button').click();
      cy.get('[href="/"] [tabindex="0"] div span').click();    
  });
});

describe('Pilots Comparative page', () => {
  it('Enters Pilots page and pick drivers', function() {
      cy.visit('/')
      cy.get('[href="/pilots"]', { timeout: 5000 }).click();
      cy.get('#app-desktop-container .PrivateSwitchBase-input').uncheck();
      cy.get('#app-desktop-container .pilots-desktop-menu-button').click();
      cy.get('#app-desktop-container div:nth-child(2) > .pilots-desktop-photo-card-title > .material-icons').click();
      cy.get('#standard-basic').click();
      cy.get('#standard-basic').clear();
      cy.get('#standard-basic').type('hamil');
      cy.get('.pilots-overlay-input-filter div:nth-child(4)').click();
      cy.get('.pilots-overlay-button').as('confirm_button').click();
      cy.get('#app-desktop-container div:nth-child(3) .material-icons').click();
      cy.get('#standard-basic').click();
      cy.get('#standard-basic').clear();
      cy.get('#standard-basic').type('prost');
      cy.get('.pilots-overlay-input-filter div:nth-child(1)').click();
      cy.get('@confirm_button').click();
      cy.get('#home-desktop-menu-item-button button').click();
      cy.get('[href="/"] [tabindex="0"] div span').click();    
  });
});


describe('Constructors page', () => {
    it('Enters Constructors page and interacts with filters', function() {
        cy.visit('/')
        cy.get('[href="/constructors"]').click();
        cy.get('[aria-label="Choose date, selected date is Feb 1, 2022"] [data-testid="CalendarIcon"]').click();
        cy.get('div:nth-child(51) button').click();
        cy.get('#app-desktop-container .constructors-main-button').click();
    });
});


describe('Menu component', () => {
    it('Try to enter to all options in menu', function() {
        cy.visit('/')
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/all-seasons"] [tabindex="0"] div span').click();
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/pilots"] [tabindex="0"] div span').click();
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/all-time"] [tabindex="0"] div span').click();
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/constructors"] [tabindex="0"] div span').click();
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/others"] [tabindex="0"] div span').click();
        cy.get('#home-desktop-menu-item-button button').click();
        cy.get('[href="/"] [tabindex="0"] div span').click();
    });
});

describe('All Time page', () => {
  it('Enters All Time page and interact with filters', function() {
    cy.visit('/')
    cy.get('[href="/all-time"]', { timeout: 5000 }).click();
    cy.get('#app-desktop-container div:nth-child(2) > .all-time-chart-details > .barchart-background > .barchart-bars > div:nth-child(4)').click();
    cy.get('body').click();
    cy.get('.all-time-option-box-component-nationality-item').click();
    cy.get('.MuiPaper-root').contains('Brazil').click();
    cy.get('body').click();
    cy.get('#number-of-drivers-select').click();
    cy.get('.MuiPaper-root').contains('3').click();
    cy.get('body').click();
    cy.get('#accomplishments-select').click();
    cy.get('.MuiPaper-root').contains('Wins').click();
    cy.get('#app-desktop-container .all-time-search-button').click();
    cy.get('body').click();
    cy.get('#accomplishments-select').click();
    cy.get('.MuiPaper-root').contains('Poles').click();
    cy.get('#app-desktop-container .all-time-search-button').click();
    cy.get('body').click();
    cy.get('#accomplishments-select').click();
    cy.get('.MuiPaper-root').contains('Podiums').click();
    cy.get('#app-desktop-container .all-time-search-button').click();
    cy.get('#date-picker-to').click().type('1990');
    cy.get('#app-desktop-container .all-time-search-button').click();
    cy.get('#home-desktop-menu-item-button button').click();
    cy.get('[href="/"] [tabindex="0"] div span').click();
  });
});

// describe('Others cool stats page', () => {
//     it('Enter Others page and interact with filters', function() {
//         cy.visit('/')
//         cy.get('[href="/others"]').click();
//         cy.get('[aria-label="Choose date, selected date is Feb 1, 2024"] [data-testid="CalendarIcon"]').click();
//         cy.get('div:nth-child(71) button').click();
//         cy.get('body').click();
//         cy.get('#\\:r4\\: [data-value="wins"]').click();
//         cy.get('#app-desktop-container .others-main-button').click();
//     });
// });
