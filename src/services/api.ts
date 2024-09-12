import axios from 'axios'

export const getTodaysGasValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/gas-tariffs/G-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  return response.data.results[0]
 } catch (error) {
  console.error('Error fetching gas tracker price:', error)
  throw error
 }
}

export const getElectricityValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/electricity-tariffs/E-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  return response.data.results[0]
 } catch (error) {
  console.error('Error fetching electricity tracker price:', error)
  throw error
 }
}
