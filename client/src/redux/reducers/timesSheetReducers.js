import { GET_TIMES_SHEET } from "../types/timesSheetTypes"

const initialState = {}

const timesSheetReducers = (state = initialState, action) => {
    switch(action.type) {
        case GET_TIMES_SHEET: return action.payload
        default: return state
    }
}

export default timesSheetReducers