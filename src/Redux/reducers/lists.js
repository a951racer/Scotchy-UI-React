import { REQUEST_LISTS, UPDATE_LIST, LISTS_RECEIVED } from '../actionTypes/lists'

const initialState = {
  lists: [],
  isLoading: false
};

const lists = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LISTS: {
      return { isLoading: true }
    }
    case UPDATE_LIST: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case LISTS_RECEIVED: {
      return {
        isLoading: false,
        lists: action.lists
      }
    }
    default:
      return state;
  }
}

export default lists