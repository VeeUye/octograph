import React from 'react'
import { getGasValueIncVat } from '../../../services/api'

interface GasTrackerProps {
 // Define props
}

const GasTracker = ({}: GasTrackerProps) => {
 const gasValue = getGasValueIncVat()

 return <div>{gasValue}</div>
}

export default GasTracker
