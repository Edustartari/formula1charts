/// <reference types="cypress" />

// it('Season page', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#f1_background_mercedes_5_1 .home-desktop-card-opacity').click();
//     cy.get('#app-desktop-container .all-seasons-desktop-buttons div:nth-child(2)').click();
//     cy.get('#app-desktop-container .all-seasons-desktop-buttons div:nth-child(2)').click();
//     cy.get('#app-desktop-container [href="/season/2021"] .all-seasons-desktop-card-text').click();
//     cy.get('[data-testid="line.Lewis Hamilton.interactive"]').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/"] [tabindex="0"] div span').click();    
// });

// it('Pilots Comparative page', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#f1_background_pilot_1_1 .home-desktop-card-opacity').click();
//     cy.get('#app-desktop-container .PrivateSwitchBase-input').uncheck();
//     cy.get('#app-desktop-container .pilots-desktop-menu-button').click();
//     cy.get('#app-desktop-container div:nth-child(2) > .pilots-desktop-photo-card-title > .material-icons').click();
//     cy.get('#standard-basic').click();
//     cy.get('#standard-basic').clear();
//     cy.get('#standard-basic').type('hamil');
//     cy.get('.pilots-overlay-input-filter div:nth-child(4)').click();
//     cy.get('.pilots-overlay-button').click();
//     cy.get('#app-desktop-container div:nth-child(3) .material-icons').click();
//     cy.get('#standard-basic').click();
//     cy.get('#standard-basic').clear();
//     cy.get('#standard-basic').type('prost');
//     cy.get('.pilots-overlay-button-erase').click();
//     cy.get('[tabindex="-1"]').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/"] [tabindex="0"] div span').click();    
// });

// it('All Time page', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#f1_background_ferrari_2_1 .home-desktop-card-title').click();
//     cy.get('#app-desktop-container div:nth-child(2) > .all-time-chart-details > .barchart-background > .barchart-bars > div:nth-child(4)').click();
//     cy.get('body').click();
//     cy.get('#\\:r0\\: [data-value="Brazil"]').click();
//     cy.get('body').click();
//     cy.get('#\\:r1\\: [data-value="3"]').click();
//     cy.get('body').click();
//     cy.get('#\\:r6\\: [data-value="wins"]').click();
//     cy.get('#app-desktop-container .all-time-main-button').click();
//     cy.get('body').click();
//     cy.get('#\\:r6\\: [data-value="poles"]').click();
//     cy.get('#app-desktop-container .all-time-main-button').click();
//     cy.get('body').click();
//     cy.get('#\\:r6\\: [data-value="podiums"]').click();
//     cy.get('#app-desktop-container .all-time-main-button').click();
//     cy.get('[aria-label="Choose date, selected date is Feb 1, 2024"] [data-testid="CalendarIcon"]').click();
//     cy.get('div:nth-child(43) button').click();
//     cy.get('#app-desktop-container .all-time-main-button').click();
//     cy.get('body').click();
//     cy.get('#\\:r1\\: [data-value="5"]').click();
//     cy.get('body').click();
//     cy.get('#\\:r0\\: [data-value="World"]').click();
//     cy.get('body').click();
//     cy.get('#\\:r6\\: [data-value="title"]').click();
//     cy.get('#app-desktop-container .all-time-main-button').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/"] [tabindex="0"] div span').click();
// });

// it('Constructors page', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#f1_background_ferrari_3_1 .home-desktop-card-title').click();
//     cy.get('[aria-label="Choose date, selected date is Feb 1, 2022"] [data-testid="CalendarIcon"]').click();
//     cy.get('div:nth-child(51) button').click();
//     cy.get('#app-desktop-container .constructors-main-button').click();
//     cy.get('#app-desktop-container [fill="#db4848"]').click();
// });

// it('Others cool stats page', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#f1_background_mercedes_4_1 .home-desktop-card-title').click();
//     cy.get('[aria-label="Choose date, selected date is Feb 1, 2024"] [data-testid="CalendarIcon"]').click();
//     cy.get('div:nth-child(71) button').click();
//     cy.get('body').click();
//     cy.get('#\\:r4\\: [data-value="wins"]').click();
//     cy.get('#app-desktop-container .others-main-button').click();
// });

// it('Menu component', function() {
//     cy.visit('http://127.0.0.1:8000/')
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/all-seasons"] [tabindex="0"] div span').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/pilots"] [tabindex="0"] div span').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/all-time"] [tabindex="0"] div span').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/constructors"] [tabindex="0"] div span').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/others"] [tabindex="0"] div span').click();
//     cy.get('#home-desktop-menu-item-button button').click();
//     cy.get('[href="/"] [tabindex="0"] div span').click();
// });
