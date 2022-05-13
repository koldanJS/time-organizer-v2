import { GET_ARCHIVE } from "../types/archiveTypes"

const initialState = null

const archiveReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_ARCHIVE: return action.payload
        default: return state
    }
}

export default archiveReducers