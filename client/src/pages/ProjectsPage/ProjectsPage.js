import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMessage } from '../../hooks/useMessage'
import ProjectItem from './ProjectItem/ProjectItem'
import NewProjectItem from './NewProjectItem/NewProjectItem'
import EmptyItem from '../../components/EmptyItem/EmptyItem'
import images from '../../components/img/img'
import './ProjectsPage.css'

const ProjectsPage = () => {

    const projects = useSelector(state => state.projects)
    const [isAddNewProject, setIsAddNewProject] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const { setMessageState, message, showMessage } = useMessage()

    const getItems = () => {
        // Эта функция рендерит массив <ProjectItem />
        const getProjectItems = () => {
            // Если массив пуст - проектов нет
            if (projects.length === 0) return (
                <EmptyItem text='Добавляйте новые проекты и они появятся здесь!' />
            )
            return projects.map( project => <ProjectItem
                key={ project._id }
                project={ project }
                isEdit={ isEdit }
                changeIsEdit={ setIsEdit }
                isAddNewProject={ isAddNewProject }
                setMessage={ setMessageState }
            /> )
        }
        // Если в режиме добавления проекта, то сначала рендерим добавляемый проект, после остальные
        if (isAddNewProject) return (
            <>
                <NewProjectItem
                    cancelProjectAddition={ () => setIsAddNewProject(false) }
                    setMessage={ setMessageState }
                />
                { getProjectItems() }
            </>
        )
        return getProjectItems()
    }

    const addNewProjectStart = () => {
        if (isEdit) return setMessageState('Сначала завершите редактирование проекта', 'error', 'projects-page')
        setIsAddNewProject(true)
    }

    return (
        <main>
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
        </main>
    )
}

export default ProjectsPage