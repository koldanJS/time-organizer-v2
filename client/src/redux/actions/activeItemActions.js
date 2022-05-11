import { GET_ACTIVE_ITEM } from '../types/activeItemTypes'

export const getActiveItem = (activeItem) => ({
    type: GET_ACTIVE_ITEM,
    payload: activeItem
})