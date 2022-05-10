import { GET_TASKS } from "../types/taskTypes"

const initialState = []

const taskReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS: return action.payload
        default: return state
    }
}

export default taskReducers