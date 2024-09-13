import React from 'react'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GasTracker from './index'

jest.mock('@tanstack/react-query', () => {
 const originalModule = jest.requireActual('@tanstack/react-query')
 return {
  ...originalModule,
  useQuery: jest.fn(),
 }
})

const { useQuery } = jest.requireMock('@tanstack/react-query')

const createTestQueryClient = () => {
 return new QueryClient({
  defaultOptions: {
   queries: {
    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
   },
  },
 })
}

const setup = () => {
 const queryClient = createTestQueryClient()

 render(
  <QueryClientProvider client={queryClient}>
   <GasTracker />
  </QueryClientProvider>
 )
}

describe('GasTracker', () => {
 beforeEach(() => {
  jest.clearAllMocks()
 })

 it('renders today`s tracker and standard gas values after a successful fetch', async () => {
  useQuery
   .mockImplementationOnce(() => ({
    data: {
     value_inc_vat: 10.5,
     value_exc_vat: 9.5,
     valid_from: '2023-01-01',
     valid_to: '2023-12-31',
     payment_method: 'Credit Card',
    },
    isLoading: false,
    isError: false,
    error: null,
   }))
   .mockImplementationOnce(() => ({
    data: {
     value_inc_vat: 11.0,
     value_exc_vat: 10.0,
     valid_from: '2023-01-01',
     valid_to: '2023-12-31',
     payment_method: 'Direct Debit',
    },
    isLoading: false,
    isError: false,
    error: null,
   }))

  setup()

  await waitFor(() => {
   expect(screen.getByText(/today's tracker gas price:/i)).toHaveTextContent(
    '10.50 p/kWh'
   )

   expect(
    screen.getByText(/today's standard tariff gas price:/i)
   ).toHaveTextContent('11.00 p/kWh')
  })
 })

 it('renders loading state initially', async () => {
  useQuery.mockImplementation(() => {
   return {
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
   }
  })

  setup()

  await waitFor(() => {
   expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })
 })

 it('renders error state when fetch fails', async () => {
  useQuery.mockImplementation(() => {
   return {
    data: undefined,
    isLoading: false,
    isError: true,
    error: new Error('Failed to fetch'),
   }
  })

  setup()

  await waitFor(() => {
   expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument()
  })
 })
})
