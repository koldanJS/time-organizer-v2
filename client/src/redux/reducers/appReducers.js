import { CHANGE_OFFSET, SET_MESSAGE, SET_OFFSET, SET_PERMANENT_MESSAGE } from "../types/appTypes"
import { getDate, getSelectedWeek } from "../../functions"

const initialState = {
    offset: 0,
    selectedDate: getDate(0),
    selectedWeek: getSelectedWeek(0),
    message: null,
    permanentMessage: null
}

const appReducers = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_OFFSET: {
            const newOffset = state.offset + action.payload
            return { ...state, offset: newOffset, selectedDate: getDate(newOffset), selectedWeek: getSelectedWeek(newOffset) }
        }
        case SET_OFFSET: {
            const newOffset = action.payload
            return { ...state, offset: newOffset, selectedDate: getDate(newOffset), selectedWeek: getSelectedWeek(newOffset) }
        }
        case SET_MESSAGE: {
            return { ...state, message: action.payload }
        }
        case SET_PERMANENT_MESSAGE: {
            return { ...state, permanentMessage: action.payload }
        }
        default: return state
    }
}

export default appReducers