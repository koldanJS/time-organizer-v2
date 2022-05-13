import { GET_ACTIVE_ITEM } from "../types/activeItemTypes"

const initialState = null

const activeItemReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_ACTIVE_ITEM: return action.payload
        default: return state
    }
}

export default activeItemReducers