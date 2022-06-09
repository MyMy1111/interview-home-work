import { combineReducers } from 'redux'
import blogReducer from './blogReducer'

const rootReducers = combineReducers({
  blogReducer: blogReducer
})

export default rootReducers;