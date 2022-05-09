import { GET_AUTH_STATE } from "../types/appTypes"

const initialState = {}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_AUTH_STATE: return action.payload
        default: return state
    }
}

export default appReducer