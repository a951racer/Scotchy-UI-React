import { REQUEST_TASTING_NOTES,
  UPDATE_TASTING_NOTE,
  TASTING_NOTES_RECEIVED,
  TASTING_NOTE_UPDATED,
  CREATE_TASTING_NOTE,
  TASTING_NOTE_CREATED,
  DELETE_TASTING_NOTE,
  TASTING_NOTE_DELETED,
} from '../actionTypes/tastingNotes'

import tastingNoteApi from '../../API/tastingNote'
//import { bindActionCreators } from 'redux';

const api = new tastingNoteApi();

export const requestTastingNotes = () => {
  return {
    type: REQUEST_TASTING_NOTES
  }
}

export const tastingNotesReceived = (tastingNotes) => {
  return {
    type: TASTING_NOTES_RECEIVED,
    tastingNotes: tastingNotes
  }
}

export const updateTastingNote = () => {
  return {
    type: UPDATE_TASTING_NOTE
  }
}

export const tastingNoteUpdated = (tastingNote) => {
  return {
    type: TASTING_NOTE_UPDATED,
    tastingNote: tastingNote
  }
}

export const creatingTastingNote = () => {
  return {
    type: CREATE_TASTING_NOTE
  }
}

export const tastingNoteCreated = (newTastingNote) => {
  return {
    type: TASTING_NOTE_CREATED,
    newTastingNote
  }
}

export const deletingTastingNote = () => {
  return {
    type: DELETE_TASTING_NOTE
  }
}

export const tastingNoteDeleted = (deletedTastingNote) => {
  return {
    type: TASTING_NOTE_DELETED,
    deletedTastingNote
  }
}

export const fetchTastingNotes = force => async (dispatch, getState) => {
  const state = getState()
  if (state.tastingNotes.tastingNotes && state.tastingNotes.tastingNotes.length > 0 && !force) return
  dispatch(requestTastingNotes())
  const tastingNotes = await api.getTastingNotes()
  dispatch(tastingNotesReceived(tastingNotes))
}

export const saveTastingNote = tastingNote => async dispatch => {
  dispatch(updateTastingNote())
  await api.saveTastingNote(tastingNote)
  dispatch(tastingNoteUpdated(tastingNote))
}

export const createTastingNote = tastingNote => async dispatch => {
  dispatch(creatingTastingNote())
  await api.createTastingNote(tastingNote)
  dispatch(tastingNoteCreated(tastingNote))
}

export const deleteTastingNote = tastingNote => async dispatch => {
  dispatch(deletingTastingNote())
  await api.deleteTastingNote(tastingNote)
  dispatch(tastingNoteDeleted(tastingNote))
}
