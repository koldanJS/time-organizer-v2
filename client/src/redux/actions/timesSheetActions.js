import { GET_TIMES_SHEET } from '../types/timesSheetTypes'

export const getTimesSheet = (timesSheet) => ({
    type: GET_TIMES_SHEET,
    payload: timesSheet
})