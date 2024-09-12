import axios from 'axios'

export const getGasTrackerData = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/gas-tariffs/G-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  return response.data
 } catch (error) {
  console.error('Error fetching gas tracker price:', error)
  throw error
 }
}

export const getGasValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/gas-tariffs/G-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  const valueIncVat = response.data.value_inc_vat

  return valueIncVat
 } catch (error) {
  console.error('Error fetching gas tracker price:', error)
  throw error
 }
}
