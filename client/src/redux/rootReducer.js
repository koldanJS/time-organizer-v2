import {combineReducers} from 'redux'
import appReducers from './reducers/appReducers'
import userReducers from './reducers/userReducers'
import projectReducers from './reducers/projectReducers'
import taskReducers from './reducers/taskReducers'

const rootReducer = combineReducers({
    app: appReducers,
    user: userReducers,
    projects: projectReducers,
    tasks: taskReducers
})

export default rootReducer