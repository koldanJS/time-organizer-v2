import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/useHttp'
import { getProjects } from '../../redux/actions/projectActions'
import { getTasks } from '../../redux/actions/taskActions'
import ProjectItem from './ProjectItem/ProjectItem'
import NewProjectItem from './NewProjectItem/NewProjectItem'
import Loader from '../../components/Loader/Loader'
import images from '../../components/img/img'
import Message from '../../components/UI/Message/Message'
import './ProjectsPage.css'

const ProjectsPage = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.app)
    const projects = useSelector(state => state.projects)
    const { request, loading } = useHttp()
    const { logout } = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAddNewProject, setIsAddNewProject] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [message, setMessage] = useState(false)

    const fetchData = useCallback(async () => {
        console.log('Projects: fetchData')
        try {
          const projects = await request(
              '/api/project',
              'GET',
              null,
              { Authorization: `Bearer ${token}` }
          )
          const tasks = await request(
            '/api/task',
            'GET',
            null,
            { Authorization: `Bearer ${token}` }
        )
          dispatch(getProjects(projects))
          dispatch(getTasks(tasks))
          setIsLoaded(true)
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
        }
    }, [token, request])
    //Вызывается при каждой перезагрузке и изменении токена
    useEffect(() => {
        fetchData()    // Только при прекращении добавления проекта
    }, [fetchData])
    
    const showMessage = () => {
        setTimeout(() => {
            setMessage(false)
        }, 3000);
        return <Message message={ message.message } type={ message.type } pageClass='projects-page' />
    }

    const getItems = () => {
        // Если данные еще не загружены или грузятся
        if (!isLoaded || loading) return (
            <div className='projects-loader' >
                <Loader />
            </div>
        )
        // Эта функция рендерит массив <ProjectItem />
        const getProjectItems = () => {
            // Если массив пуст - проектов нет
            if (projects.length === 0) return (
                <p className='text' >У вас еще нет проектов</p>
            )
            return projects.map( project => <ProjectItem
                key={ project._id }
                project={ project }
                isEdit={ isEdit }
                changeIsEdit={ setIsEdit }
                isAddNewProject={ isAddNewProject }
                setMessage={ setMessage }
                token={ token }
                request={ request }
                fetchData={ fetchData }
                logout={ logout }
            /> )
        }
        // Если в режиме добавления проекта, то сначала рендерим добавляемый проект, после остальные
        if (isAddNewProject) return (
            <>
                <NewProjectItem
                    cancelProjectAddition={ () => setIsAddNewProject(false) }
                    setMessage={ setMessage }
                    token={ token }
                    request={ request }
                    fetchData={ fetchData }
                    logout={ logout }
                />
                { getProjectItems() }
            </>
        )
        return getProjectItems()
    }

    const addNewProjectStart = () => {
        if (isEdit) return setMessage({ message: 'Сначала завершите редактирование проекта', type: 'error' })
        setIsAddNewProject(true)
    }

    return (
        <div className='projects' >
            <div className='projects-top' >
                <button
                    className='new'
                    onClick={ addNewProjectStart }
                >
                        <img
                            src={images.whitePlusLogo}
                            alt='Plus'
                        />
                    <p className='text size-20 color-white' >Новый проект</p>
                </button>
                {
                    message
                        ? showMessage()
                        : null
                }
            </div>
            <hr className='demiliter' />
            <ul className='projects-header' >
                <li className='text editor' >
                    <img
                        src={images.gearsLogo}
                        alt='Gears'
                    />
                </li>
                <li className='text' >Название проекта</li>
                <li className='text description' >Описание</li>
                <li className='text tasks' >Список задач</li>
            </ul>
            <ul className='projects-lits' >
                { getItems() }
            </ul>
        </div>
    )
}

export default ProjectsPage