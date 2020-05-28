import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/scotches/prices'
const getApiRoot = 'https://scotchy-api-staging.herokuapp.com/api/prices'

export default class PriceAPI {

  async getPrices() {
    const res = await axios.get(getApiRoot)
    return res.data
  }

  async savePrice(price) {
    const res = await axios.put(apiRoot + `/${price.scotchId}`, price)
    return res.data
  }

  async createPrice(price) {
    const res = await axios.post(apiRoot + `/${price.scotchId}`, price)
    return res.data
  }

  async deletePrice(price) {
    const res = await axios.delete(apiRoot + `/${price.scotchId}`, {data: price})
    return res.data
  }
}