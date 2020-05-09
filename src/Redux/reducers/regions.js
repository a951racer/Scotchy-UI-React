import { REQUEST_REGIONS, UPDATE_REGION, REGIONS_RECEIVED } from '../actionTypes/regions'

const initialState = {
  regions: [],
  isLoading: false
};

const regions = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGIONS: {
      return { isLoading: true }
    }
    case UPDATE_REGION: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case REGIONS_RECEIVED: {
      return {
        isLoading: false,
        regions: action.regions
      }
    }
    default:
      return state;
  }
}

export default regions