import { GET_AUTH_STATE } from '../types/authTypes'

export const getAuthState = (authState) => ({
    type: GET_AUTH_STATE,
    payload: authState
})