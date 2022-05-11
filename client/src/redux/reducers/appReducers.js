import { CHANGE_OFFSET, SET_OFFSET } from "../types/appTypes"
import { getDate, getSelectedWeek } from "../../functions"

const initialState = {
    offset: 0,
    selectedDate: getDate(0),
    selectedWeek: getSelectedWeek(0)
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
        default: return state
    }
}

export default appReducers