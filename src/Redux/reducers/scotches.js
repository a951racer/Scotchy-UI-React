import { REQUEST_SCOTCHES, UPDATE_SCOTCH, SCOTCHES_RECEIVED } from '../actionTypes/scotches'

const initialState = {
  scotches: [],
  isLoading: false
};

const scotches = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SCOTCHES: {
      return { isLoading: true }
    }
    case UPDATE_SCOTCH: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case SCOTCHES_RECEIVED: {
      return {
        isLoading: false,
        scotches: action.scotches
      }
    }
    default:
      return state;
  }
}

export default scotches