import { REQUEST_STYLES, UPDATE_STYLE, STYLES_RECEIVED } from '../actionTypes/styles'

import scotchApi from '../../API/scotch'

const api = new scotchApi();

export const requestStyles = () => {
  return {
    type: REQUEST_STYLES
  }
}

export const updateStyle = () => {
  return {
    type: UPDATE_STYLE
  }
}

export const stylesReceived = (styles) => {
  return {
    type: STYLES_RECEIVED,
    styles: styles
  }
}

export const fetchStyles = () => async dispatch => {
  dispatch(requestStyles())
  const styles = await api.getStyles()
  dispatch(stylesReceived(styles))
}
  