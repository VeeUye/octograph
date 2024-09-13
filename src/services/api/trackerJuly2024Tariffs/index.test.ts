import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { getTodaysGasValueIncVat, getElectricityValueIncVat } from './index'

const mock = new MockAdapter(axios)
const apiBaseUrl = 'https://api.octopus.energy/v1/products/SILVER-24-07-01'
const gasUrl = `${apiBaseUrl}/gas-tariffs/G-1R-SILVER-24-07-01-G/standard-unit-rates/`
const electricityUrl = `${apiBaseUrl}/electricity-tariffs/E-1R-SILVER-24-07-01-G/standard-unit-rates/`

describe('API', () => {
 afterEach(() => {
  mock.reset()
 })

 describe('getTodaysGasValueIncVat', () => {
  it('should fetch the gas value for the current 24 hour period', async () => {
   const response = {
    results: [
     {
      valid_from: new Date(Date.now() - 10000).toISOString(),
      valid_to: new Date(Date.now() + 10000).toISOString(),
     },
    ],
   }
   mock.onGet(gasUrl).reply(200, response)

   const result = await getTodaysGasValueIncVat()
   expect(result).toEqual(response.results[0])
  })

  it('should throw an error if no gas pricing for the current 24 hour period data is available', async () => {
   mock.onGet(gasUrl).reply(200, { results: [] })

   await expect(getTodaysGasValueIncVat()).rejects.toThrow(
    'No current pricing data available for this period.'
   )
  })

  it('should handle axios errors', async () => {
   mock.onGet(gasUrl).reply(500)

   await expect(getTodaysGasValueIncVat()).rejects.toThrow(
    'Request failed with status code 500'
   )
  })
 })

 describe('getElectricityValueIncVat', () => {
  it('should fetch the electricity value for the current 24 hour period', async () => {
   const response = {
    results: [
     {
      valid_from: new Date(Date.now() - 10000).toISOString(),
      valid_to: new Date(Date.now() + 10000).toISOString(),
     },
    ],
   }
   mock.onGet(electricityUrl).reply(200, response)

   const result = await getElectricityValueIncVat()
   expect(result).toEqual(response.results[0])
  })

  it('should throw an error if no electricity pricing data is available for the current 24 hour period', async () => {
   mock.onGet(electricityUrl).reply(200, { results: [] })

   await expect(getElectricityValueIncVat()).rejects.toThrow(
    'No current pricing data available for this period.'
   )
  })

  it('should handle axios errors', async () => {
   mock.onGet(electricityUrl).reply(500)

   await expect(getElectricityValueIncVat()).rejects.toThrow(
    'Request failed with status code 500'
   )
  })
 })
})
