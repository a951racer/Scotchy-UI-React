import { REQUEST_PRICES,
  UPDATE_PRICE,
  PRICES_RECEIVED,
  PRICE_UPDATED,
  CREATE_PRICE,
  PRICE_CREATED,
  DELETE_PRICE,
  PRICE_DELETED
} from '../actionTypes/prices'

const initialState = {
  prices: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const prices = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRICES: {
      return {
        ...state,
        isLoading: true }
    }

    case PRICES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        prices: action.prices
      }
    }

    case UPDATE_PRICE: {
      return {
        ...state,
        isUpdating: true } 
    }

    case PRICE_UPDATED: {
      const currState = {...state}
      let updatedPrices = currState.prices.map(price => {
        if (price._id === action.price._id) return action.price
        return price
      })
      return {
        ...state,
        isUpdating: false,
        prices: updatedPrices
      }
    }

    case CREATE_PRICE: {
      return {
        ...state,
        isCreating: true
      }
    }

    case PRICE_CREATED: {
      return {
        ...state,
        //prices: [...state.prices, action.newPrice],
        isCreating: false
      }
    }

    case DELETE_PRICE: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case PRICE_DELETED: {
      //const currState = {...state}
      /*let updatedPrices = currState.prices.filter(price => {
        if (price._id !== action.deletedPrice._id) return true
        return false
      })*/
      return {
        ...state,
        //prices: updatedPrices,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default prices