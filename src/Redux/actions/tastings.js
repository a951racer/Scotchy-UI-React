import { REQUEST_TASTINGS, UPDATE_TASTING, TASTINGS_RECEIVED } from '../actionTypes/tastings'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestTastings = () => {
  return {
    type: REQUEST_TASTINGS
  }
}

export const updateTasting = () => {
  return {
    type: UPDATE_TASTING
  }
}

export const tastingsReceived = (tastings) => {
  return {
    type: TASTINGS_RECEIVED,
    tastings: tastings
  }
}

export const fetchTastings = () => async dispatch => {
  dispatch(requestTastings())
  const tastings = await api.getTastings()
  dispatch(tastingsReceived(tastings))
}
  