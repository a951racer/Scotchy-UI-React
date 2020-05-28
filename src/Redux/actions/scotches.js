import { REQUEST_SCOTCHES,
  UPDATE_SCOTCH,
  SCOTCHES_RECEIVED,
  SCOTCH_UPDATED,
  CREATE_SCOTCH,
  SCOTCH_CREATED,
  DELETE_SCOTCH,
  SCOTCH_DELETED
} from '../actionTypes/scotches'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestScotches = () => {
  return {
    type: REQUEST_SCOTCHES
  }
}

export const scotchesReceived = (scotches) => {
  return {
    type: SCOTCHES_RECEIVED,
    scotches: scotches
  }
}

export const updateScotch = () => {
  return {
    type: UPDATE_SCOTCH
  }
}

export const scotchUpdated = (scotch) => {
  return {
    type: SCOTCH_UPDATED,
    scotch: scotch
  }
}

export const creatingScotch = () => {
  return {
    type: CREATE_SCOTCH
  }
}

export const scotchCreated = (newScotch) => {
  return {
    type: SCOTCH_CREATED,
    newScotch
  }
}

export const deletingScotch = () => {
  return {
    type: DELETE_SCOTCH
  }
}

export const scotchDeleted = (deletedScotch) => {
  return {
    type: SCOTCH_DELETED,
    deletedScotch
  }
}

export const fetchScotches = () => async (dispatch, getState) => {
  const state = getState()
  if (state.scotches.scotches && state.scotches.scotches.length > 0) return
  dispatch(requestScotches())
  const scotches = await api.getScotches()
  dispatch(scotchesReceived(scotches))
}

export const saveScotch = scotch => async dispatch => {
  dispatch(updateScotch())
  const updatedScotch = await api.saveScotch(scotch)
  dispatch(scotchUpdated(updatedScotch))
}

export const createScotch = scotch => async dispatch => {
  dispatch(creatingScotch())
  const newScotch = await api.createScotch(scotch)
  dispatch(scotchCreated(newScotch))
}

export const deleteScotch = scotch => async dispatch => {
  dispatch(deletingScotch())
  const deletedScotch = await api.deleteScotch(scotch)
  dispatch(scotchDeleted(deletedScotch))
}