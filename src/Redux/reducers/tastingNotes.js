import { REQUEST_TASTING_NOTES,
  UPDATE_TASTING_NOTE,
  TASTING_NOTES_RECEIVED,
  TASTING_NOTE_UPDATED,
  CREATE_TASTING_NOTE,
  TASTING_NOTE_CREATED,
  DELETE_TASTING_NOTE,
  TASTING_NOTE_DELETED,
} from '../actionTypes/tastingNotes'

const initialState = {
  tastingNotes: [],
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
  displayEditDialog: false,
  editMode: null,
  editTastingNote: {}
};

const tastingNotes = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TASTING_NOTES: {
      return {
        ...state,
        isLoading: true }
    }

    case TASTING_NOTES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        tastingNotes: action.tastingNotes
      }
    }

    case UPDATE_TASTING_NOTE: {
      return {
        ...state,
        isUpdating: true } 
    }

    case TASTING_NOTE_UPDATED: {
      const currState = {...state}
      let updatedTastingNotes = currState.tastingNotes.map(tastingNote => {
        if (tastingNote._id === action.tastingNote._id) return action.tastingNote
        return tastingNote
      })
      return {
        ...state,
        isUpdating: false,
        tastingNotes: updatedTastingNotes
      }
    }

    case CREATE_TASTING_NOTE: {
      return {
        ...state,
        isCreating: true
      }
    }

    case TASTING_NOTE_CREATED: {
      return {
        ...state,
        //tastingNotes: [...state.tastingNotes, action.newTastingNote],
        isCreating: false
      }
    }

    case DELETE_TASTING_NOTE: {
      return {
        ...state,
        isDeleting: true
      }
    }

    case TASTING_NOTE_DELETED: {
      //const currState = {...state}
      //let updatedTastingNotes = currState.tastingNotes.filter(tastingNote => {
        //if (tastingNote._id !== action.deletedTastingNote._id) return true
        //return false
      //})
      return {
        ...state,
        //tastingNotes: updatedTastingNotes,
        isDeleting: false
      }
    }

    default:
      return state;
  }
}

export default tastingNotes