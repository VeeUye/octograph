import React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import GasTracker from './index'

describe('GasTracker', () => {
 it('displays hello', () => {
  render(<GasTracker />)

  expect(screen.getByText('Hello')).toBeVisible()
 })
})
