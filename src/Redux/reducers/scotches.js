import { REQUEST_SCOTCHES,
  UPDATE_SCOTCH,
  SCOTCHES_RECEIVED,
  SCOTCH_UPDATED,
  CREATE_SCOTCH,
  SCOTCH_CREATED,
  DELETE_SCOTCH,
  SCOTCH_DELETED
} from '../actionTypes/scotches'

const initialState = {
  scotches: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const scotches = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SCOTCHES: {
      return {
        ...state,
        isLoading: true }
    }

    case SCOTCHES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        scotches: action.scotches
      }
    }

    case UPDATE_SCOTCH: {
      return {
        ...state,
        isUpdating: true } 
    }

    case SCOTCH_UPDATED: {
      const currState = {...state}
      let updatedScotches = currState.scotches.map(scotch => {
        if (scotch.id === action.scotch.id) return action.scotch
        return scotch
      })
      return {
        ...state,
        isUpdating: false,
        scotches: updatedScotches
      }
    }

    case CREATE_SCOTCH: {
      return {
        ...state,
        isCreating: true
      }
    }

    case SCOTCH_CREATED: {
      return {
        ...state,
        scotches: [...state.scotches, action.newScotch],
        isCreating: false
      }
    }

    case DELETE_SCOTCH: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case SCOTCH_DELETED: {
      const currState = {...state}
      let updatedScotches = currState.scotches.filter(scotch => {
        if (scotch.id !== action.deletedScotch.id) return true
        return false
      })
      return {
        ...state,
        scotches: updatedScotches,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default scotches