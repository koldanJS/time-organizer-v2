import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import ProjectsList from '../components/ProjectsList/ProjectsList'
import Loader from '../components/Loader/Loader'

const ProjectsPage = () => {

    const { request, loading } = useHttp()
    const [projects, setProjects] = useState(null)
    const { token } = useContext(AuthContext)

    const fetchProjects = useCallback(async () => {
        try {
            const fetched = await request(
                '/api/project',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setProjects(fetched)
        } catch(e) {}
    }, [token, request])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    if (!projects || loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Projects Page</h1>
            <ProjectsList projects={ projects } />
        </div>
    )
}

export default ProjectsPage