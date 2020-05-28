import { REQUEST_LISTS,
  UPDATE_LIST,
  LISTS_RECEIVED,
  LIST_UPDATED,
  CREATE_LIST,
  LIST_CREATED,
  DELETE_LIST,
  LIST_DELETED
} from '../actionTypes/lists'

import listApi from '../../API/list'

const api = new listApi();

export const requestLists = () => {
  return {
    type: REQUEST_LISTS
  }
}

export const listsReceived = (lists) => {
  return {
    type: LISTS_RECEIVED,
    lists: lists
  }
}

export const updateList = () => {
  return {
    type: UPDATE_LIST
  }
}

export const listUpdated = (list) => {
  return {
    type: LIST_UPDATED,
    list: list
  }
}

export const creatingList = () => {
  return {
    type: CREATE_LIST
  }
}

export const listCreated = (newList) => {
  return {
    type: LIST_CREATED,
    newList
  }
}

export const deletingList = () => {
  return {
    type: DELETE_LIST
  }
}

export const listDeleted = (deletedList) => {
  return {
    type: LIST_DELETED,
    deletedList
  }
}

export const fetchLists = () => async (dispatch, getState) => {
  const state = getState()
  if (state.lists.lists && state.lists.lists.length > 0) return
  dispatch(requestLists())
  const lists = await api.getLists()
  dispatch(listsReceived(lists))
}

export const saveList = list => async dispatch => {
  dispatch(updateList())
  const updatedList = await api.saveList(list)
  dispatch(listUpdated(updatedList))
}

export const createList = list => async dispatch => {
  dispatch(creatingList())
  const newList = await api.createList(list)
  dispatch(listCreated(newList))
}

export const deleteList = list => async dispatch => {
  dispatch(deletingList())
  const deletedList = await api.deleteList(list)
  dispatch(listDeleted(deletedList))
}