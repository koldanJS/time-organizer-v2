import React, { useState } from 'react'
import { v4 } from 'uuid'
// import axiosHandler from '../../../../axios/axiosHandler'
// import { useSimpledStore, useUpdate } from '../../../../functions/functions'
import images from '../../../components/img/img'
import './ProjectItem.css'

const ProjectItem = ({ projectId, isEdit, changeIsEdit, isAddNewProject, setMessage }) => {

    // const { getUpdate } = useUpdate()
    const { userId, user, projects, tasks } = {}//useSimpledStore()
    const [isAddTask, setIsAddTask] = useState(false)
    const [projectName, setProjectName] = useState('projects[projectId]?.projectName')
    const [description, setDescription] = useState('projects[projectId]?.description')
    const [taskName, setTaskName] = useState('')
    const [updatedTasks, setUpdatedTasks] = useState({} /*tasks*/)
    const [updatedTasksId, setUpdatedTasksId] = useState([] /*projects[projectId]?.tasksId*/)

    const getTasks = () => {
        return (
            updatedTasksId.map( id => {
                return (
                    <li className='task-item' key={id}>
                        <p className={ (isEdit === projectId) ? 'text' : 'text mar-r' } > { updatedTasks[id].taskName } </p>
                        {
                            (isEdit === projectId)
                                ? <button onClick={ () => deleteTask(id) } >
                                    <img
                                        src={images.xLogo}
                                        alt='X'
                                    />
                                </button>
                                : null
                        }
                    </li>
                )
            } )
        )
    }

    const addTask = event => {
        // if (event.code !== 'Enter') return //Срабатывает только на Enter
        // if (!taskName) return setMessage('Имя задачи не должно быть пустым!')
        // if (taskName.length > 25) return setMessage('Имя задачи более 25 символов!')
        // const newId = v4()  //Получаем шифрованный id
        // setUpdatedTasksId([...updatedTasksId, newId])   //Добавляем в состояние
        // const newTask = { [newId]: { createdBy: userId, projectId, taskName } }
        // const newTasks = { ...updatedTasks, ...newTask }    //Сформированную задачу добавляем к остальным
        // setUpdatedTasks(newTasks)   //Обновляем состояние
        // setIsAddTask(false) //И отключаем редактор
        // setTaskName('') //Далее очищаем сопутствующие поля
    }

    const deleteTask = idForDelete => {
        // setUpdatedTasksId(updatedTasksId.filter(id => id !== idForDelete))  //Отфильтровать из массива id удаляемой задачи, обновить состояние
        // const newTasks = {}
        // updatedTasksId.forEach(id => { newTasks[id] = updatedTasks[id] })   //Теперь добавить в новый объект только задачи с id из отфильтрованного массива
        // setUpdatedTasks(newTasks)   //Обновить состояние
    }

    const addTaskInput = () => {
        // const closeTaskInput = () => {
        //     setIsAddTask(false)
        //     setTaskName('')
        // }
        // return (
        //     <>
        //         <input
        //             className='add-task text'
        //             value={ taskName }
        //             placeholder='Название задачи...'
        //             onChange={ (e) => setTaskName(e.target.value) }
        //             onKeyDown={ addTask }
        //         />
        //         <button onClick={ closeTaskInput } >
        //             <img
        //                 src={images.xLogo}
        //                 alt='X'
        //             />
        //         </button>
        //     </>
        // )
    }

    const cancelEdit = () => {
        // setIsAddTask(false)
        // setProjectName(projects[projectId].projectName)
        // setDescription(projects[projectId].description)
        // setTaskName('')
        // setUpdatedTasks(tasks)
        // setUpdatedTasksId(projects[projectId].tasksId)
        // changeIsEdit(false)
    }

    const saveChanges = async () => {
        // if (!projectName) return setMessage('Имя проекта не должно быть пустым!')
        // if (projectName.length > 25) return setMessage('Название проекта более 25 символов!')
        // if (description.length > 50) return setMessage('Описание проекта более 50 символов!')
        // const tasksArr = []
        // const tasksUrls = updatedTasksId.map(id => {    //Создаем обновленный массив задач проекта и ссылок на них
        //     tasksArr.push(updatedTasks[id])
        //     return `/tasks/${id}.json`
        // })
        // const updatedTasksPromises = tasksUrls.map((url, index) => axiosHandler.put(url, tasksArr[index]))

        // const newProject = {    //Создаем объект сохраняемого проекта
        //     createdBy: userId,
        //     createdTime: Date.now(),
        //     description,
        //     projectName,
        //     tasksId: updatedTasksId
        // }

        // //Нужно обновить список задач у user с учетом изменений текущего проекта ...
        // let userTasksId = [...user.tasksId]    //Получили весь старый массив id задач для редактирования у user
        // const projectTasksId = [...projects[projectId].tasksId]    //Получили весь старый массив id задач для сверки у project
        // userTasksId = userTasksId.filter(id =>  !projectTasksId.includes(id))  //Вычли из масива user старые задачи, входящие в project
        // userTasksId = [...userTasksId, ...updatedTasksId]   //Положили в массив user новые id задач из project

        // //Из БД нужно удалить все удаленные из проекта задачи, т.к. пока что они лишь вычеркнуты из списка у user и project
        // const deletedId = projectTasksId.filter(id => !updatedTasksId.includes(id))   //Нашли все id удаленных задач
        // const deletedUrls = deletedId.map(id => `/tasks/${id}.json` )   //Сформировали по ним массив ссылок
        // const deletedPromises = deletedUrls.map(url => axiosHandler.delete(url))    //А далее массив промисов

        // try {
        //     await Promise.all(updatedTasksPromises) //Добавили разом все задачи из обновленного массива задач
        //     await Promise.all(deletedPromises)  //Удалили разом все задачи, что были удалены в проекте
        //     await axiosHandler.put(`/projects/${projectId}.json`, newProject)  //Добавили в БД отредактированный проект
        //     await axiosHandler.put(`/users/${userId}/tasksId.json`, userTasksId)    //Заменили список задач у user
        //     await getUpdate()   //Обновили данные состояния приложения
        // } catch(e) {
        //     console.log('saveChanges(put tasks or changed project)', e)
        // }
        // setIsAddTask(false)
        // setTaskName('')
        // changeIsEdit(false)
    }

    const deleteProject = async () => {
        // //Нужно обновить список задач у user с учетом удаления текущего проекта ...
        // let userTasksId = [...user.tasksId]    //Получили весь старый массив id задач для редактирования у user
        // const projectTasksId = [...projects[projectId].tasksId]    //Получили весь старый массив id задач для сверки у project
        // userTasksId = userTasksId.filter(id => !projectTasksId.includes(id))  //Вычли из масива user старые задачи, входящие в project

        // //Нужно обновить список проектов у user с учетом удаления текущего проекта ...
        // let userProjectsId = [...user.projectsId]    //Получили весь старый массив id задач для редактирования у user
        // userProjectsId = userProjectsId.filter(id => id !== projectId)  //Вычли из масива user id удаляемого проекта

        // //Из БД нужно удалить проект и входящие в него задачи
        // const promises = []
        // promises.push(axiosHandler.delete(`/projects/${projectId}.json`))  //Добавили промис удаления проекта
        // projectTasksId.forEach(id => {
        //     promises.push(axiosHandler.delete(`/tasks/${id}.json`))  //Добавили промисы удаления задач
        // })

        // try {
        //     await Promise.all(promises) //Добавили разом проект и входящие в него задачи
        //     await axiosHandler.put(`/users/${userId}/tasksId.json`, userTasksId)    //Заменили список задач у user
        //     await axiosHandler.put(`/users/${userId}/projectsId.json`, userProjectsId)    //Заменили список проектов у user
        //     await getUpdate()   //Обновили данные состояния приложения
        // } catch(e) {
        //     console.log('saveChanges(delete project)', e)
        // }

        // changeIsEdit(false)
    }

    const editStart = () => {
        // if (isAddNewProject) return setMessage('Сначала завершите создание нового проекта')
        // changeIsEdit(projectId)
    }

    return (
        <li className='project-item' >
            <ul>
                <li className='text editor' >
                    {
                        (isEdit === projectId)
                            ? <>
                                <button
                                    onClick={ saveChanges }
                                    className='save'
                                >
                                    <img
                                        src={images.saveLogo}
                                        alt='Save'
                                    />
                                </button>
                                <button
                                    onClick={ cancelEdit }
                                    className='cancel'
                                >
                                    <img
                                        className='cancel'
                                        src={images.xLogo}
                                        alt='Cancel'
                                    />
                                </button>
                                <button
                                    onClick={ deleteProject }
                                    className='trash'    
                                >
                                    <img
                                        src={images.trashLogo}
                                        alt='Trash'
                                    />
                                </button>
                            </>
                            : <button onClick={ editStart } >
                                <img
                                    src={images.editLogo}
                                    alt='Edit'
                                />
                            </button>
                    }
                </li>
                <li>
                    {
                        (isEdit === projectId)
                            ? <textarea
                                className='edit-project text'
                                value={ projectName }
                                placeholder='Название проекта...'
                                onChange={ (e) => setProjectName(e.target.value) }
                            />
                            : <p className='text' > { projects[projectId].projectName } </p>
                    }
                </li>
                <li className='text description' >
                    {
                        (isEdit === projectId)
                            ? <textarea
                                className='edit-project text'
                                value={ description }
                                placeholder='Описание проекта...'
                                onChange={ (e) => setDescription(e.target.value) }
                            />
                            : <p className='text' > { projects[projectId].description } </p>
                    }
                </li>
                <li className='tasks' >
                    <ul className='tasks-list'>
                        { getTasks() }
                        {
                            (isEdit === projectId)
                                ? <li className='task-item' >
                                    {
                                        isAddTask
                                            ? addTaskInput()
                                            : <button
                                                onClick={ (e) => setIsAddTask(!isAddTask) }
                                            >
                                                <img
                                                    src={images.plusLogo}
                                                    alt='Add'
                                                />
                                            </button>
                                    }
                                </li>
                                : null
                        }
                    </ul>
                </li>
            </ul>
        </li>
    )
}

export default ProjectItem