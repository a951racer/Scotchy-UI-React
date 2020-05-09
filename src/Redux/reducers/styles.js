import { REQUEST_STYLES, UPDATE_STYLE, STYLES_RECEIVED } from '../actionTypes/styles'

const initialState = {
  styles: [],
  isLoading: false
};

const styles = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STYLES: {
      return { isLoading: true }
    }
    case UPDATE_STYLE: {
      return { userStatus: 'loggedIn' }  // plus user attributes, token etc. from action.payload
    }
    case STYLES_RECEIVED: {
      return {
        isLoading: false,
        styles: action.styles
      }
    }
    default:
      return state;
  }
}

export default styles