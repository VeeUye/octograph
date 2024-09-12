import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GasTracker from './components/organisms/GasTracker'

const queryClient = new QueryClient()

const App: React.FC = () => {
 return (
  <QueryClientProvider client={queryClient}>
   <h1>Welcome to Octograph</h1>
   <GasTracker />
  </QueryClientProvider>
 )
}

export default App
