import { GET_AUTH_STATE } from "../types/authTypes"

const initialState = {}

const authReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_AUTH_STATE: return action.payload
        default: return state
    }
}

export default authReducers