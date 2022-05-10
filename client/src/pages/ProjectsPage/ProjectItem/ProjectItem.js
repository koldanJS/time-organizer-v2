import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import images from '../../../components/img/img'
import './ProjectItem.css'

const ProjectItem = ({ project, isEdit, changeIsEdit, isAddNewProject, setMessage, token, request, fetchData, logout }) => {

    // console.log('project', project)
    const { tasks } = useSelector(state => state)
    // console.log('tasks', tasks)
    const [isAddTask, setIsAddTask] = useState(false)
    const [form, setForm] = useState({ projectName: project.name, description: project.description })
    const [taskName, setTaskName] = useState('')
    const [newTasks, setNewTasks] = useState([])  // Новые добавляемые задачи в течении этого редактирования
    // console.log('newTasks', newTasks)
    const [deletedTasksId, setDeletedTasksId] = useState([])  // Удаляемые задачи в течении этого редактирования
    // console.log('deletedTasksId', deletedTasksId)
    const currentTasks = tasks.filter(task => task.project === project._id)  // Только задачи этого проекта
    // console.log('currentTasks', currentTasks)
    const showingTasks = currentTasks.filter(task => !deletedTasksId.includes(task._id))  // Только задачи этого проекта, за исключением удаляемых
    // console.log('showingTasks', showingTasks)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const getTasks = () => {
        return (
            showingTasks.map( task => {
                return (
                    <li className='task-item' key={ task._id }>
                        <p className={ (isEdit === project._id) ? 'text' : 'text mar-r' } > { task.name } </p>
                        {
                            (isEdit === project._id)
                                ? <button onClick={ () => deleteExistingTask(task._id) } >
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
        .concat(
            newTasks.map( (task, index) => {
                return (
                    <li className='task-item' key={ index }>
                        <p className='text' > { task.name } </p>
                        <button onClick={ () => deleteNewTask(index) } >
                            <img
                                src={images.xLogo}
                                alt='X'
                            />
                        </button>
                    </li>
                )
            } )
            )
            
        )
    }

    const addTask = event => {
        if (event.code !== 'Enter') return //Срабатывает только на Enter
        if (!taskName) return setMessage({ message: 'Имя задачи не должно быть пустым!', type: 'error' })
        if (taskName.length > 25) return setMessage({ message: 'Имя задачи более 25 символов!', type: 'error' })
        setNewTasks([...newTasks, { name: taskName }])    // Добавляем имя задачи, id проекта и пользователя добавятся на сервере
        setIsAddTask(false) // Отключаем редактор задач
        setTaskName('') //Далее очищаем сопутствующие поля
    }

    const deleteExistingTask = idForDelete => {
        setDeletedTasksId([...deletedTasksId, idForDelete])
    }

    const deleteNewTask = index => {
        setNewTasks(newTasks.filter((task, i) => i !== index))  // Отфильтровать из массива задачу с таким индексом
    }

    const addTaskInput = () => {
        const closeTaskInput = () => {
            setIsAddTask(false)
            setTaskName('')
        }
        return (
            <>
                <input
                    className='add-task text'
                    value={ taskName }
                    placeholder='Название задачи...'
                    onChange={ (e) => setTaskName(e.target.value) }
                    onKeyDown={ addTask }
                />
                <button onClick={ closeTaskInput } >
                    <img
                        src={images.xLogo}
                        alt='X'
                    />
                </button>
            </>
        )
    }

    const cancelEdit = () => {
        setIsAddTask(false)
        setForm({ projectName: project.name, description: project.description })
        setTaskName('')
        setNewTasks([])
        setDeletedTasksId([])
        changeIsEdit(false)
    }

    const saveChanges = async () => {
        if (!form.projectName) return setMessage({ message: 'Имя проекта не должно быть пустым!', type: 'error' })
        if (form.projectName.length > 25) return setMessage({ message: 'Название проекта более 25 символов!', type: 'error' })
        if (form.description.length > 50) return setMessage({ message: 'Описание проекта более 50 символов!', type: 'error' })
        try {
            const response = await request(
                '/api/project/edit',
                'PUT',
                { ...form, projectId: project._id, newTasks, deletedTasksId },
                { Authorization: `Bearer ${token}` }
            )
            setMessage({ message: response.message, type: 'success' })
            await fetchData()
            cancelEdit() //Закрыли компонент, редактирующий проекты
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
            setMessage({ message: e.message, type: 'error' })
        }
    }

    const deleteProject = async () => {
        try {
            const response = await request(
                '/api/project/delete',
                'DELETE',
                { projectId: project._id },
                { Authorization: `Bearer ${token}` }
            )
            setMessage({ message: response.message, type: 'success' })
            await fetchData()
            cancelEdit() //Закрыли компонент, редактирующий проекты
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
            setMessage({ message: e.message, type: 'error' })
        }
    }

    const editStart = () => {
        if (isAddNewProject) return setMessage({ message: 'Сначала завершите создание нового проекта!', type: 'error' })
        changeIsEdit(project._id)
    }

    return (
        <li className='project-item' >
            <ul>
                <li className='text editor' >
                    {
                        (isEdit === project._id)
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
                        (isEdit === project._id)
                            ? <textarea
                                className='edit-project text'
                                name='projectName'
                                value={ form.projectName }
                                placeholder='Название проекта...'
                                onChange={ changeHandler }
                            />
                            : <p className='text' > { project.name } </p>
                    }
                </li>
                <li className='text description' >
                    {
                        (isEdit === project._id)
                            ? <textarea
                                className='edit-project text'
                                name='description'
                                value={ form.description }
                                placeholder='Описание проекта...'
                                onChange={ changeHandler }
                            />
                            : <p className='text' > { project.description } </p>
                    }
                </li>
                <li className='tasks' >
                    <ul className='tasks-list'>
                        { getTasks() }
                        {
                            (isEdit === project._id)
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