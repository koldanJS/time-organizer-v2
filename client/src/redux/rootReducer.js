import {combineReducers} from 'redux'
import appReducers from './reducers/appReducers'
import authReducers from './reducers/authReducers'
import userReducers from './reducers/userReducers'
import projectReducers from './reducers/projectReducers'
import taskReducers from './reducers/taskReducers'
import timesSheetReducers from './reducers/timesSheetReducers'
import activeItemReducers from './reducers/activeItemReducers'

const rootReducer = combineReducers({
    app: appReducers,
    auth: authReducers,
    user: userReducers,
    projects: projectReducers,
    tasks: taskReducers,
    timesSheet: timesSheetReducers,
    activeItem: activeItemReducers
})

export default rootReducer