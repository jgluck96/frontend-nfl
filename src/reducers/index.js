import { combineReducers } from 'redux';
import games from './games'
import odds from './odds'
import modals from './modals'
import user from './users'
import week from './week'

export default combineReducers({
  games,
  modals,
  user,
  week,
  odds
})
