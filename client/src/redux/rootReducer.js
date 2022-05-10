import {combineReducers} from 'redux'
import authReducers from './reducers/authReducers'
import userReducers from './reducers/userReducers'
import projectReducers from './reducers/projectReducers'
import taskReducers from './reducers/taskReducers'

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    projects: projectReducers,
    tasks: taskReducers
})

export default rootReducer