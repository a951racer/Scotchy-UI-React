import { combineReducers } from 'redux'
import auth from './auth'
import scotches from './scotches'
import styles from './styles'
import regions from './regions'
import tastingNotes from './tastingNotes'
import lists from './lists'
import prices from './prices'

export default combineReducers({
  auth,
  scotches,
  styles,
  regions,
  tastingNotes,
  lists,
  prices
})
