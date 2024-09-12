import React from 'react'
import { getElectricityValueIncVat } from '../../../services/api'
import { useQuery } from '@tanstack/react-query'

interface ElectrictyTrackerProps {
 // Define props
}

const ElectrictyTracker = ({}: ElectrictyTrackerProps) => {
 const { isLoading, isError, data, error } = useQuery({
  queryKey: ['getElectricityValueIncVat'],
  queryFn: getElectricityValueIncVat,
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
    Latest electricity price: <strong>{data.value_inc_vat}</strong>
   </p>
  </>
 )
}

export default ElectrictyTracker
