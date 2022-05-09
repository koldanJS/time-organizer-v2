import { GET_PROJECTS } from '../types/projectTypes'

export const getProjects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects
})