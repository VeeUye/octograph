import React from 'react'
import { getTodaysGasValueIncVat } from '../../../services/api/trackerJuly2024Tariffs'
import { useQuery } from '@tanstack/react-query'
import { getStandardTariffGasValueIncVat } from '../../../services/api/standardTariffs'

interface GasTrackerProps {
 // Define props
}

const GasTracker = ({}: GasTrackerProps) => {
 const {
  isLoading: isLoadingTracker,
  isError: isErrorTracker,
  data: dataTracker,
  error: errorTracker,
 } = useQuery({
  queryKey: ['tracker'],
  queryFn: getTodaysGasValueIncVat,
 })

 const {
  isLoading: isLoadingStandard,
  isError: isErrorStandard,
  data: dataStandard,
  error: errorStandard,
 } = useQuery({
  queryKey: ['standard'],
  queryFn: getStandardTariffGasValueIncVat,
 })

 if (isLoadingTracker) {
  return <span>Loading...</span>
 }

 if (isErrorTracker) {
  return <span>Error: {errorTracker.message}</span>
 }

 return (
  <>
   <p>
    Today's tracker gas price:{' '}
    <strong>{dataTracker.value_inc_vat.toFixed(2)}</strong> p/kWh
   </p>
   <p>
    Today's standard tariff gas price:{' '}
    <strong>{dataStandard.value_inc_vat.toFixed(2)}</strong> p/kWh
   </p>
  </>
 )
}

export default GasTracker
