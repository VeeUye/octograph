import React from 'react'
import { getGasTrackerPrice } from './services/api'

const App: React.FC = () => {
 console.log(getGasTrackerPrice())
 return (
  <div>
   <h1>Welcome to Octograph</h1>
  </div>
 )
}

export default App
