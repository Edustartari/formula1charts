/// <reference types="cypress" />

// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(true)
//   })
// })

// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(false)
//   })
// })

describe('My First Test', () => {
  it('finds the content "type"', () => {
    //Visit: https://example.cypress.io
    cy.visit('https://example.cypress.io')

    // Find the element with content: type and click on it
    cy.contains('type')
    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    // Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
});

// Test visting pages
// describe('home', () => {
//   it('passes', () => {
//     cy.visit('127.0.0.1:8000/')
//   })
// })
// describe('uol', () => {
//   it('passes', () => {
//     cy.visit('https://www.uol.com.br/')
//   })
// })
// describe('criminal', () => {
//   it('passes', () => {
//     cy.visit('https://criminal-map.vercel.app/')
//   })
// })
// describe('map', () => {
//   it('passes', () => {
//     cy.visit('https://map-polygon.vercel.app/')
//   })
// })
// describe('book', () => {
//   it('passes', () => {
//     cy.visit('https://book-analysis-app.vercel.app/')
//   })
// })
// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://formula1charts.vercel.app')
//   })
// })
