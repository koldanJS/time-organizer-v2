import { GET_ARCHIVE } from '../types/archiveTypes'

export const getArchive = (archive) => ({
    type: GET_ARCHIVE,
    payload: archive
})