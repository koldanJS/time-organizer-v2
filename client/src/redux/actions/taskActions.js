import { GET_TASKS } from '../types/taskTypes'

export const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})