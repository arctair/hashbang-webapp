// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('App', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('renders the app', function () {
    cy.request('delete', 'https://hashbang.arctair.com/namedTagLists')

    cy.reload()

    cy.get('#root').should('be.empty')

    cy.request(
      'post',
      'https://hashbang.arctair.com/namedTagLists',
      JSON.stringify({ name: 'minnesota', tags: ['#cold'] }),
    )
      .its('isOkStatusCode')
      .should('be.true')

    cy.reload()

    cy.get('[data-testid=namedTagList] > [data-testid=name]').should(
      'have.text',
      'minnesota',
    )
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').should(
      'have.text',
      '#cold',
    )

    cy.request('delete', 'https://hashbang.arctair.com/namedTagLists')
      .its('isOkStatusCode')
      .should('be.true')
  })
})
