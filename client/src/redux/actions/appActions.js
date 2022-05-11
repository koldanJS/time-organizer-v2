import { CHANGE_OFFSET, SET_OFFSET } from '../types/appTypes'

export const changeOffset = (step) => ({
    type: CHANGE_OFFSET,
    payload: step
})

export const setOffset = (offset) => ({
    type: SET_OFFSET,
    payload: offset
})