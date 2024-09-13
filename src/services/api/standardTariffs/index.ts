import axios from 'axios'

interface Result {
 valid_from: string
 valid_to: string
}

export const getStandardTariffGasValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/VAR-BB-23-04-01/gas-tariffs/G-1R-VAR-BB-23-04-01-G/standard-unit-rates/'
  )

  const now = new Date()

  const result = response.data.results.find((result: Result) => {
   const validFrom = new Date(result.valid_from)
   const validTo = new Date(result.valid_to)

   return now >= validFrom && now < validTo
  })

  if (!result) {
   throw new Error('No current pricing data available for this period.')
  }

  return result
 } catch (error) {
  if (process.env.NODE_ENV !== 'test') {
   console.error('Error fetching standard tariff gas price:', error)
  }
  throw error
 }
}

export const getStandardTariffElectricityValueIncVat = async () => {
 try {
  const response = await axios.get(
   'https://api.octopus.energy/v1/products/VAR-BB-23-04-01/electricity-tariffs/E-1R-VAR-BB-23-04-01-G/standard-unit-rates/'
  )

  const now = new Date()

  const result = response.data.results.find((result: Result) => {
   const validFrom = new Date(result.valid_from)
   const validTo = new Date(result.valid_to)

   return now >= validFrom && now < validTo
  })

  if (!result) {
   throw new Error('No current pricing data available for this period.')
  }

  return result
 } catch (error) {
  if (process.env.NODE_ENV !== 'test') {
   console.error('Error fetching standard tariff electricity price:', error)
  }
  throw error
 }
}
