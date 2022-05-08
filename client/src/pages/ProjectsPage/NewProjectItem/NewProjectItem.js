import React, { useState } from 'react'
import { v4 } from 'uuid'
// import axiosHandler from '../../../../axios/axiosHandler'
// import { useSimpledStore, useUpdate } from '../../../../functions/functions'
import images from '../../../components/img/img'
import './NewProjectItem.css'

const NewProjectItem = ({ cancelProjectAddition, newProjectId, setMessage }) => {

    // const { getData } = useUpdate()
    const { userId, user, tasks } = {} //useSimpledStore()
    const [isAddTask, setIsAddTask] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [taskName, setTaskName] = useState('')
    const [updatedTasks, setUpdatedTasks] = useState({} /*tasks*/)
    const [updatedTasksId, setUpdatedTasksId] = useState([])

    const getTasks = () => {
        return (
            updatedTasksId.map( id => {
                return (
                    <li className='task-item' key={id}>
                        <p className='text' > { updatedTasks[id].taskName } </p>
                        <button onClick={ () => deleteTask(id) } >
                            <img
                                src={images.xLogo}
                                alt='X'
                            />
                        </button>
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
        // const newTask = { [newId]: { createdBy: userId, projectId: newProjectId, taskName } }
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

        // const newProject = {    //Создаем объект создаваемого проекта
        //     createdBy: userId,
        //     createdTime: Date.now(),
        //     description,
        //     projectName,
        //     tasksId: updatedTasksId
        // }

        // //Нужно обновить список проектов у user, добавив новый проект ...
        // const userProjectsId = [...user.projectsId, newProjectId]   //Положили в массив user id нового проекта

        // //Нужно обновить список задач у user, добавив задачи из нового проекта ...
        // const userTasksId = [...user.tasksId, ...updatedTasksId]   //Положили в массив user новые id задач из project

        // try {
        //     await Promise.all(updatedTasksPromises) //Добавили разом все задачи из обновленного массива задач
        //     await axiosHandler.put(`/projects/${newProjectId}.json`, newProject)  //Добавили в БД новый проект
        //     await axiosHandler.put(`/users/${userId}/projectsId.json`, userProjectsId)    //Заменили список проектов у user
        //     await axiosHandler.put(`/users/${userId}/tasksId.json`, userTasksId)    //Заменили список задач у user
        //     await getData(userId)   //Обновили данные состояния приложения
        // } catch(e) {
        //     console.log('saveChanges(put tasks or new project)', e)
        // }

        // cancelProjectAddition() //Закрыли компонент, добавляющий проекты
    }

    return (
        <li className='project-item new-project' >
            <ul>
                <li className='text editor' >
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
                        onClick={ cancelProjectAddition }
                        className='cancel'
                    >
                        <img
                            className='cancel'
                            src={images.xLogo}
                            alt='Cancel'
                        />
                    </button>
                </li>
                <li>
                    <textarea
                        className='edit-project text'
                        value={ projectName }
                        placeholder='Название проекта...'
                        onChange={ (e) => setProjectName(e.target.value) }
                    />
                </li>
                <li className='text description' >
                    <textarea
                        className='edit-project text'
                        value={ description }
                        placeholder='Описание проекта...'
                        onChange={ (e) => setDescription(e.target.value) }
                    />
                </li>
                <li className='tasks' >
                    <ul className='tasks-list'>
                        { getTasks() }
                        <li className='task-item' >
                            {
                                isAddTask
                                    ? addTaskInput()
                                    : <button
                                        onClick={ () => setIsAddTask(!isAddTask) }
                                    >
                                        <img
                                            src={images.plusLogo}
                                            alt='Add'
                                        />
                                    </button>
                            }
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    )
}

export default NewProjectItem