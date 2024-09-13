import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
 getStandardTariffGasValueIncVat,
 getStandardTariffElectricityValueIncVat,
} from './index'

const mock = new MockAdapter(axios)
const gasUrl =
 'https://api.octopus.energy/v1/products/VAR-BB-23-04-01/gas-tariffs/G-1R-VAR-BB-23-04-01-G/standard-unit-rates/'
const electricityUrl = `https://api.octopus.energy/v1/products/VAR-BB-23-04-01/electricity-tariffs/E-1R-VAR-BB-23-04-01-G/standard-unit-rates/`

describe('Standard Tariffs', () => {
 afterEach(() => {
  mock.reset()
 })

 describe('getCurrentStandardTariffValueIncVat', () => {
  it('should fetch the standard tariff gas value for the current 24 hour period', async () => {
   const response = {
    results: [
     {
      valid_from: new Date(Date.now() - 10000).toISOString(),
      valid_to: new Date(Date.now() + 10000).toISOString(),
     },
    ],
   }
   mock.onGet(gasUrl).reply(200, response)

   const result = await getStandardTariffGasValueIncVat()
   expect(result).toEqual(response.results[0])
  })

  it('should throw an error if no standard tariff gas pricing for the current 24 hour period data is available', async () => {
   mock.onGet(gasUrl).reply(200, { results: [] })

   await expect(getStandardTariffGasValueIncVat()).rejects.toThrow(
    'No current pricing data available for this period.'
   )
  })

  it('should handle axios errors', async () => {
   mock.onGet(gasUrl).reply(500)

   await expect(getStandardTariffGasValueIncVat()).rejects.toThrow(
    'Request failed with status code 500'
   )
  })
 })

 describe('getCurrentStandardTariffElectricityValueIncVat', () => {
  it('should fetch the standard tariff electricity value for the current 24 hour period', async () => {
   const response = {
    results: [
     {
      valid_from: new Date(Date.now() - 10000).toISOString(),
      valid_to: new Date(Date.now() + 10000).toISOString(),
     },
    ],
   }
   mock.onGet(electricityUrl).reply(200, response)

   const result = await getStandardTariffElectricityValueIncVat()
   expect(result).toEqual(response.results[0])
  })

  it('should throw an error if no electricity pricing data is available for the current 24 hour period', async () => {
   mock.onGet(electricityUrl).reply(200, { results: [] })

   await expect(getStandardTariffElectricityValueIncVat()).rejects.toThrow(
    'No current pricing data available for this period.'
   )
  })

  it('should handle axios errors', async () => {
   mock.onGet(electricityUrl).reply(500)

   await expect(getStandardTariffElectricityValueIncVat()).rejects.toThrow(
    'Request failed with status code 500'
   )
  })
 })
})
