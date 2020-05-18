import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/styles'

export default class StyleAPI {

  async getStyles() {
    const res = await axios.get(apiRoot)
    return res.data
  }

  async saveStyle(style) {
    const res = await axios.put(apiRoot + `/${style._id}`, style)
    return res.data
  }

  async createStyle(style) {
    const res = await axios.post(apiRoot, style)
    return res.data
  }

  async deleteStyle(style) {
    const res = await axios.delete(apiRoot + `/${style._id}`, style)
    return res.data
  }
}