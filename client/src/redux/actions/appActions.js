import { CHANGE_OFFSET, SET_OFFSET, SET_MESSAGE, SET_PERMANENT_MESSAGE } from '../types/appTypes'

export const changeOffset = (step) => ({
    type: CHANGE_OFFSET,
    payload: step
})

export const setOffset = (offset) => ({
    type: SET_OFFSET,
    payload: offset
})

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const setPermanentMessage = (message) => ({
    type: SET_PERMANENT_MESSAGE,
    payload: message
})