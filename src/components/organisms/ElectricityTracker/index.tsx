import React from 'react'
import { getElectricityValueIncVat } from '../../../services/api/trackerJuly2024Tariffs'
import { useQuery } from '@tanstack/react-query'
import { getStandardTariffElectricityValueIncVat } from '../../../services/api/standardTariffs'

interface ElectrictyTrackerProps {
 // Define props
}

const ElectrictyTracker = ({}: ElectrictyTrackerProps) => {
 const {
  isLoading: isLoadingTracker,
  isError: isErrorTracker,
  data: dataTracker,
  error: errorTracker,
 } = useQuery({
  queryKey: ['tracker'],
  queryFn: getElectricityValueIncVat,
 })

 const {
  isLoading: isLoadingStandard,
  isError: isErrorStandard,
  data: dataStandard,
  error: errorStandard,
 } = useQuery({
  queryKey: ['standard'],
  queryFn: getStandardTariffElectricityValueIncVat,
 })

 if (isLoadingTracker) {
  return <span>Loading...</span>
 }

 if (isErrorTracker) {
  return <span>Error: {errorTracker.message}</span>
 }

 const trackerLowerThanStandard =
  dataTracker.value_inc_vat < dataStandard.value_inc_vat
 const trackerHigherThanStandard =
  dataTracker.value_inc_vat > dataStandard.value_inc_vat

 const getStyle = () => {
  if (trackerLowerThanStandard) {
   return { color: 'green', fontWeight: 'bold' }
  }
  if (trackerHigherThanStandard) {
   return { color: 'red', fontWeight: 'bold' }
  }
  return { color: 'black', fontWeight: 'normal' }
 }

 return (
  <>
   <p>
    Today's tracker electricity price:{' '}
    <strong style={getStyle()}>{dataTracker.value_inc_vat.toFixed(2)}</strong>{' '}
    p/kWh
   </p>
   <p>
    Today's standard tariff electricity price:{' '}
    <strong>{dataStandard.value_inc_vat.toFixed(2)}</strong> p/kWh
   </p>
  </>
 )
}

export default ElectrictyTracker
