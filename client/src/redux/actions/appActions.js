import { GET_AUTH_STATE } from '../types/appTypes'

export const getAuthState = (authState) => ({
    type: GET_AUTH_STATE,
    payload: authState
})