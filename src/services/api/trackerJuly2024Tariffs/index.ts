import axios from 'axios'

interface Result {
 valid_from: string
 valid_to: string
}

export const getTodaysGasValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/gas-tariffs/G-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  const now = new Date()

  const currentResult = response.data.results.find((result: Result) => {
   const validFrom = new Date(result.valid_from)
   const validTo = new Date(result.valid_to)

   return now >= validFrom && now < validTo
  })

  if (!currentResult) {
   throw new Error('No current pricing data available for this period.')
  }

  return currentResult
 } catch (error) {
  if (process.env.NODE_ENV !== 'test') {
   console.error('Error fetching gas tracker price:', error)
  }
  throw error
 }
}

export const getElectricityValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/SILVER-24-07-01/electricity-tariffs/E-1R-SILVER-24-07-01-G/standard-unit-rates/'
  )

  const now = new Date()

  const currentResult = response.data.results.find((result: Result) => {
   const validFrom = new Date(result.valid_from)
   const validTo = new Date(result.valid_to)

   return now >= validFrom && now < validTo
  })

  if (!currentResult) {
   throw new Error('No current pricing data available for this period.')
  }

  return currentResult
 } catch (error) {
  if (process.env.NODE_ENV !== 'test') {
   console.error('Error fetching electricity tracker price:', error)
  }
  throw error
 }
}
