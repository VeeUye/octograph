import React from 'react'
import { getTodaysGasValueIncVat } from '../../../services/api/trackerJuly2024Tariffs'
import { useQuery } from '@tanstack/react-query'

interface GasTrackerProps {
 // Define props
}

const GasTracker = ({}: GasTrackerProps) => {
 const { isLoading, isError, data, error } = useQuery({
  queryKey: ['gasTrackerValueIncVat'],
  queryFn: getTodaysGasValueIncVat,
 })

 if (isLoading) {
  return <span>Loading...</span>
 }

 if (isError) {
  return <span>Error: {error.message}</span>
 }

 return (
  <>
   <p>
    Today's gas price: <strong>{data.value_inc_vat}</strong>
   </p>
  </>
 )
}

export default GasTracker
