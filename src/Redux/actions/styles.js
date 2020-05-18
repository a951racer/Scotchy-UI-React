import { REQUEST_STYLES,
  UPDATE_STYLE,
  STYLES_RECEIVED,
  STYLE_UPDATED,
  CREATE_STYLE,
  STYLE_CREATED,
  DELETE_STYLE,
  STYLE_DELETED
} from '../actionTypes/styles'

import styleApi from '../../API/style'

const api = new styleApi();

export const requestStyles = () => {
  return {
    type: REQUEST_STYLES
  }
}

export const stylesReceived = (styles) => {
  return {
    type: STYLES_RECEIVED,
    styles: styles
  }
}

export const updateStyle = () => {
  return {
    type: UPDATE_STYLE
  }
}

export const styleUpdated = (style) => {
  return {
    type: STYLE_UPDATED,
    style: style
  }
}

export const creatingStyle = () => {
  return {
    type: CREATE_STYLE
  }
}

export const styleCreated = (newStyle) => {
  return {
    type: STYLE_CREATED,
    newStyle
  }
}

export const deletingStyle = () => {
  return {
    type: DELETE_STYLE
  }
}

export const styleDeleted = (deletedStyle) => {
  return {
    type: STYLE_DELETED,
    deletedStyle
  }
}

export const fetchStyles = () => async (dispatch, getState) => {
  const state = getState()
  if (state.styles.styles && state.styles.styles.length > 0) return
  dispatch(requestStyles())
  const styles = await api.getStyles()
  dispatch(stylesReceived(styles))
}

export const saveStyle = style => async dispatch => {
  dispatch(updateStyle())
  const updatedStyle = await api.saveStyle(style)
  dispatch(styleUpdated(updatedStyle))
}

export const createStyle = style => async dispatch => {
  dispatch(creatingStyle())
  const newStyle = await api.createStyle(style)
  dispatch(styleCreated(newStyle))
}

export const deleteStyle = style => async dispatch => {
  dispatch(deletingStyle())
  const deletedStyle = await api.deleteStyle(style)
  dispatch(styleDeleted(deletedStyle))
}