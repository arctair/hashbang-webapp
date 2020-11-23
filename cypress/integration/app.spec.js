// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('App', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('renders the app', function () {
    cy.request('delete', 'https://hashbang.arctair.com/namedTagLists?bucket=default')
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

    cy.get('[data-testid=namedTagList] > [data-testid=name]').should(
      'have.value',
      'trees',
    )
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').should(
      'have.value',
      '#branchy #whispering',
    )

    cy.get('[data-testid=namedTagList] > [data-testid=name]').clear()
    cy.get('[data-testid=namedTagList] > [data-testid=name]').type(
      'november',
    )
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').clear()
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').type(
      '#cold #pandemic',
    )

    cy.reload()

    cy.get('[data-testid=namedTagList] > [data-testid=name]').should(
      'have.value',
      'november',
    )
    cy.get('[data-testid=namedTagList] > [data-testid=tags]').should(
      'have.value',
      '#cold #pandemic',
    )

    cy.get('[data-testid=namedTagList] > [data-testid=delete]').click()

    cy.get('[data-testid=namedTagList]').should('not.exist')
  })
})
