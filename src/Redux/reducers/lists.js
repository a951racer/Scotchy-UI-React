import { REQUEST_LISTS,
  UPDATE_LIST,
  LISTS_RECEIVED,
  LIST_UPDATED,
  CREATE_LIST,
  LIST_CREATED,
  DELETE_LIST,
  LIST_DELETED
} from '../actionTypes/lists'

const initialState = {
  lists: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
};

const lists = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LISTS: {
      return {
        ...state,
        isLoading: true }
    }

    case LISTS_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        lists: action.lists
      }
    }

    case UPDATE_LIST: {
      return {
        ...state,
        isUpdating: true } 
    }

    case LIST_UPDATED: {
      const currState = {...state}
      let updatedLists = currState.lists.map(list => {
        if (list._id === action.list._id) return action.list
        return list
      })
      return {
        ...state,
        isUpdating: false,
        lists: updatedLists
      }
    }

    case CREATE_LIST: {
      return {
        ...state,
        isCreating: true
      }
    }

    case LIST_CREATED: {
      return {
        ...state,
        lists: [...state.lists, action.newList],
        isCreating: false
      }
    }

    case DELETE_LIST: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case LIST_DELETED: {
      const currState = {...state}
      let updatedLists = currState.lists.filter(list => {
        if (list._id !== action.deletedList._id) return true
        return false
      })
      return {
        ...state,
        lists: updatedLists,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default lists