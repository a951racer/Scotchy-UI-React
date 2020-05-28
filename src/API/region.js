import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/regions'

export default class RegionAPI {

  async getRegions() {
    const res = await axios.get(apiRoot)
    return res.data
  }

  async saveRegion(region) {
    const res = await axios.put(apiRoot + `/${region._id}`, region)
    return res.data
  }

  async createRegion(region) {
    const res = await axios.post(apiRoot, region)
    return res.data
  }

  async deleteRegion(region) {
    const res = await axios.delete(apiRoot + `/${region._id}`, region)
    return res.data
  }
}