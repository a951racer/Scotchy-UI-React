import axios from 'axios'

const apiGetRoot = 'https://scotchy-api-staging.herokuapp.com/api/tastings'
const apiRoot = 'https://scotchy-api-staging.herokuapp.com/api/scotches/tastings'

export default class TastingAPI {

  async getTastingNotes() {
    const res = await axios.get(apiGetRoot)
    return res.data
  }

  async saveTastingNote(tastingNote) {
    const res = await axios.put(apiRoot + `/${tastingNote.scotchId}`, tastingNote)
    return res.data
  }

  async createTastingNote(tastingNote) {
    const res = await axios.post(apiRoot + `/${tastingNote.scotchId}`, tastingNote)
    return res.data
  }

  async deleteTastingNote(tastingNote) {
    const res = await axios.delete(apiRoot + `/${tastingNote.scotchId}`, {data: tastingNote})
    return res.data
  }
}