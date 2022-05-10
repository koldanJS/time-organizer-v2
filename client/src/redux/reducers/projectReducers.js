import { GET_PROJECTS } from "../types/projectTypes"

const initialState = []

const projectReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROJECTS: return action.payload
        default: return state
    }
}

export default projectReducers