import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/scotches'

export default class ScotchAPI {

  async getScotches() {
    const res = await axios.get(apiRoot)
    return res.data
  }

  async saveScotch(scotch) {
    const res = await axios.put(apiRoot + `/${scotch.id}`, scotch)
    return res.data
  }

  async createScotch(scotch) {
    const res = await axios.post(apiRoot, scotch)
    return res.data
  }

  async deleteScotch(scotch) {
    const res = await axios.delete(apiRoot + `/${scotch.id}`, scotch)
    return res.data
  }
}