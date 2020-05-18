import axios from 'axios'

const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/wishlists'

export default class ListAPI {

  async getLists() {
    const res = await axios.get(apiRoot)
    return res.data
  }

  async saveList(list) {
    const res = await axios.put(apiRoot + `/${list.id}`, list)
    return res.data
  }

  async createList(list) {
    const res = await axios.post(apiRoot, list)
    return res.data
  }

  async deleteList(list) {
    const res = await axios.delete(apiRoot + `/${list.id}`, list)
    return res.data
  }
}