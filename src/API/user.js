import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api'

export default class UserAPI {

  async getScotches() {
    let res = await axios.get(apiRoot + '/scotches')
    return res.data
  }

  saveScotch(scotch) {
    console.log("about to put: ")
    return axios.put(apiRoot + `/scotches/${scotch.id}`, scotch)
    .then(res => res.data)
  }

  getTastings() {
    return axios.get(apiRoot + '/tastings')
    .then(res => res.data)
  }

  getLists() {
    return axios.get(apiRoot + '/wishlists')
    .then(res => res.data)
  }

  async getPrices() {
    const res = await axios.get(apiRoot + '/prices')
    let prices = res.data
    prices = prices.map((price) => {
      if (price.price) price.price = '$' + price.price.toFixed(2)
      if (price.tax) price.tax = '$' + price.tax.toFixed(2)
      if (price.shipping) price.shipping = '$' + price.shipping.toFixed(2)
      if (price.total) price.total = '$' + price.total.toFixed(2)
      return price
    })
    console.log("prices: ", prices)
    return prices
  }

  getStyles() {
    return axios.get(apiRoot + '/styles')
    .then(res => res.data)
  }

  getRegions() {
    return axios.get(apiRoot + '/regions')
      .then(res => res.data)
  }
}