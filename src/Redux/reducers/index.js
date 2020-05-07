import { combineReducers } from 'redux'
import auth from './auth'
import scotches from './scotches'

export default combineReducers({
  auth,
  scotches
})
