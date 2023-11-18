import React from 'react'
import { GridItem } from './CardItem'

describe('<GridItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GridItem />)
  })
})