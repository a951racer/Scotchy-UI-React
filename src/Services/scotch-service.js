import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api'

export default class ScotchService {

  getScotches() {
    return axios.get(apiRoot + '/scotches')
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

  getPrices() {
    return axios.get(apiRoot + '/prices')
    .then(res => res.data)
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