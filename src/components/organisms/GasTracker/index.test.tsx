import React from 'react'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'

import GasTracker from './index'

describe('GasTracker', () => {
 afterEach(() => {
  mockAxios.reset()
 })

 const mockData = {
  method: null,
  valid_from: '2024-09-11T23:00:00Z',
  valid_to: '2024-09-12T23:00:00Z',
  value_exc_vat: 5,
  value_inc_vat: 5.25,
 }

 it('displays ', async () => {
  render(<GasTracker />)

  mockAxios.get.mockResolvedValueOnce({ data: mockData })

  const gasValue = await waitFor(() => screen.getByText('5.25'))

  expect(screen.getByText('Hello')).toBeVisible()
 })
})
