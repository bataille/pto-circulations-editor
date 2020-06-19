import { combineReducers } from 'redux'
import circulationsById from './circulationsById'
import toolbar from './toolbar'

export default combineReducers({
    toolbar,
    circulationsById
})