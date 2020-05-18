import { REQUEST_STYLES,
  UPDATE_STYLE,
  STYLES_RECEIVED,
  STYLE_UPDATED,
  CREATE_STYLE,
  STYLE_CREATED,
  DELETE_STYLE,
  STYLE_DELETED
} from '../actionTypes/styles'

const initialState = {
  styles: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const styles = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STYLES: {
      return {
        ...state,
        isLoading: true }
    }

    case STYLES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        styles: action.styles
      }
    }

    case UPDATE_STYLE: {
      return {
        ...state,
        isUpdating: true } 
    }

    case STYLE_UPDATED: {
      const currState = {...state}
      let updatedStyles = currState.styles.map(style => {
        if (style._id === action.style._id) return action.style
        return style
      })
      return {
        ...state,
        isUpdating: false,
        styles: updatedStyles
      }
    }

    case CREATE_STYLE: {
      return {
        ...state,
        isCreating: true
      }
    }

    case STYLE_CREATED: {
      return {
        ...state,
        styles: [...state.styles, action.newStyle],
        isCreating: false
      }
    }

    case DELETE_STYLE: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case STYLE_DELETED: {
      const currState = {...state}
      let updatedStyles = currState.styles.filter(style => {
        if (style._id !== action.deletedStyle._id) return true
        return false
      })
      return {
        ...state,
        styles: updatedStyles,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default styles