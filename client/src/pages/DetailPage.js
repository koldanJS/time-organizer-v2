import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/useHttp'
import { useMessage } from '../hooks/useMessage'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader/Loader'
import ProjectCard from '../components/ProjectCard/ProjectCard'


const DetailPage = () => {

    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const message = useMessage()
    const [project, setProject] = useState(null)
    const projectId = useParams().id
    // Мемоизируем ф-ю, чтоб изменять ее только при изменении массива зависимостей
    const getProject = useCallback(async () => {
        console.log('getProject')
        try {
            const fetched = await request(
                `/api/project/${projectId}`,
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setProject(fetched)
        } catch(e) {}
    }, [token, projectId, request])
  
    const deleteHandler = async (id) => {
        console.log('delete id', id)
        try {
            const data = await request(
                '/api/project/delete',
                'DELETE',
                { projectId: id },
                { Authorization: `Bearer ${token}` }
            )
            message(data.message)
        } catch(e) {}
    }


    // Получать новый проект при изменении getProject или перезагрузке
    useEffect(() => {
        getProject()
    }, [getProject])
    // Пока не загрузится проект, показывать Лодер
    if (loading || !project) {
        return <Loader />
    }

    return (
        <div>
            <h1>Detail Page</h1>
            <ProjectCard project={project} deleteHandler={deleteHandler} />
        </div>
    )
}

export default DetailPage