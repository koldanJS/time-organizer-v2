import { GET_USER, SET_USER } from "../types/userTypes"

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER: return action.payload
        case SET_USER: return { ...state, ...action.payload}
        default: return state
    }
}

export default userReducer