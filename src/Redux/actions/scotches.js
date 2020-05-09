import { REQUEST_SCOTCHES, UPDATE_SCOTCH, SCOTCHES_RECEIVED } from '../actionTypes/scotches'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestScotches = () => {
  return {
    type: REQUEST_SCOTCHES
  }
}

export const updateScotch = () => {
  return {
    type: UPDATE_SCOTCH
  }
}

export const scotchesReceived = (scotches) => {
  return {
    type: SCOTCHES_RECEIVED,
    scotches: scotches
  }
}

export const fetchScotches = () => async (dispatch, getState) => {
  const state = getState()
  if (state.scotches.scotches && state.scotches.scotches.length > 0) return
  dispatch(requestScotches())
  const scotches = await api.getScotches()
  dispatch(scotchesReceived(scotches))
}
  