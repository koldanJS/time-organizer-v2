import { GET_USER, SET_USER } from '../types/userTypes'

export const getUser = (user) => ({
    type: GET_USER,
    payload: user
})

export const setUser = (changedOptions) => ({
    type: SET_USER,
    payload: changedOptions
})