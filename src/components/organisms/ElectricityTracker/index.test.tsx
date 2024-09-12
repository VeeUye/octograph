import React from 'react'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ElectrictyTracker from './index'

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
   <ElectrictyTracker />
  </QueryClientProvider>
 )
}

describe('ElectrictyTracker', () => {
 beforeEach(() => {
  jest.clearAllMocks()
 })

 it('renders today`s electricity value after a successful fetch', async () => {
  useQuery.mockReturnValue({
   data: {
    value_inc_vat: 10.5,
    value_exc_vat: 9.5,
    valid_from: '...',
    valid_to: '...',
    payment_method: '...',
   },
   isLoading: false,
   isError: false,
   error: null,
  })

  setup()

  await waitFor(() => {
   expect(
    screen.getByText(/Today's electricity price: 10.5/i)
   ).toBeInTheDocument()
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
