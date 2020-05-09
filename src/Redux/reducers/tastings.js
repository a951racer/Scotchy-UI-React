import { REQUEST_TASTINGS, UPDATE_TASTING, TASTINGS_RECEIVED } from '../actionTypes/tastings'

const initialState = {
  tastings: [],
  isLoading: false
};

const tastings = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TASTINGS: {
      return { isLoading: true }
    }
    case UPDATE_TASTING: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case TASTINGS_RECEIVED: {
      return {
        isLoading: false,
        tastings: action.tastings
      }
    }
    default:
      return state;
  }
}

export default tastings