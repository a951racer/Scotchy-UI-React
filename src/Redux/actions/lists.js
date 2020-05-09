import { REQUEST_LISTS, UPDATE_LIST, LISTS_RECEIVED } from '../actionTypes/lists'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestLists = () => {
  return {
    type: REQUEST_LISTS
  }
}

export const updateList = () => {
  return {
    type: UPDATE_LIST
  }
}

export const listsReceived = (lists) => {
  return {
    type: LISTS_RECEIVED,
    lists: lists
  }
}

export const fetchLists = () => async dispatch => {
  dispatch(requestLists())
  const lists = await api.getLists()
  dispatch(listsReceived(lists))
}
  