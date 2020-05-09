import { REQUEST_PRICES, UPDATE_PRICE, PRICES_RECEIVED } from '../actionTypes/prices'

const initialState = {
  prices: [],
  isLoading: false
};

const prices = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRICES: {
      return { isLoading: true }
    }
    case UPDATE_PRICE: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case PRICES_RECEIVED: {
      return {
        isLoading: false,
        prices: action.prices
      }
    }
    default:
      return state;
  }
}

export default prices