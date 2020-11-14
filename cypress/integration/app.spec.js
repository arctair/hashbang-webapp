// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('App', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('renders the app', function () {
    cy.request('delete', 'https://hashbang.arctair.com/namedTagLists')
      .its('isOkStatusCode')
      .should('be.true')

    cy.reload()

    cy.get('[data-testid=namedTagList]').should('not.exist')

    cy.get('[data-testid=newNamedTagList] > [data-testid=name]').type(
      'trees',
    )
    cy.get('[data-testid=newNamedTagList] > [data-testid=tags]').type(
      '#branchy #whispering',
    )
    cy.get('[data-testid=newNamedTagList] > [data-testid=create]').click()

    cy.reload()

    cy.get('[data-testid=namedTagList] > [data-testid=name]').should(
      'have.text',
      'trees',
    )
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').should(
      'have.text',
      '#branchy #whispering',
    )

    cy.get('[data-testid=namedTagList] > [data-testid=delete]').click()

    cy.reload()

    cy.get('[data-testid=namedTagList]').should('not.exist')
  })
})
