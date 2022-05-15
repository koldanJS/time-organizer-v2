import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import TaskList from '../TaskList/TaskList'
import images from '../../../components/img/img'
import './ProjectItem.css'

const ProjectItem = ({ project, isEdit, changeIsEdit, isAddNewProject, setMessage }) => {

    const { fetchProjectData, editProject, deleteProject } = useFetchData()
    const { tasks } = useSelector(state => state)
    const [isAddTask, setIsAddTask] = useState(false)
    const [form, setForm] = useState({ projectName: project.name, description: project.description })
    const [taskName, setTaskName] = useState('')
    const [newTasks, setNewTasks] = useState([])  // Новые добавляемые задачи в течении этого редактирования
    const [deletedTasksId, setDeletedTasksId] = useState([])  // Удаляемые задачи в течении этого редактирования
    const currentTasks = tasks.filter(task => task.project === project._id)  // Только задачи этого проекта
    const showingTasks = currentTasks.filter(task => !deletedTasksId.includes(task._id))  // Только задачи этого проекта, за исключением удаляемых

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const addTask = event => {
        if (event.code !== 'Enter' && event.type !== 'blur') return //Срабатывает только на Enter и событие blur
        if (event.type === 'blur' && !taskName) return // Ошибок тут нет, пустое поле просто будет без фокуса ждать ввод
        if (event.code === 'Enter' && !taskName) return setMessage('Имя задачи не должно быть пустым!', 'error', 'projects-page')
        if (taskName.length > 25) return setMessage('Имя задачи более 25 символов!', 'error', 'projects-page')
        setNewTasks([...newTasks, { name: taskName }])    // Добавляем имя задачи, id проекта и пользователя добавятся на сервере
        setIsAddTask(false) // Отключаем редактор задач
        setTaskName('') //Далее очищаем сопутствующие поля
    }

    const deleteExistingTask = id => {
        setDeletedTasksId([...deletedTasksId, id])
    }

    const deleteNewTask = index => {
        setNewTasks(newTasks.filter((task, i) => i !== index))  // Отфильтровать из массива задачу с таким индексом
    }

    const cancelEdit = () => {
        setIsAddTask(false)
        setForm({ projectName: project.name, description: project.description })
        setTaskName('')
        setNewTasks([])
        setDeletedTasksId([])
        changeIsEdit(false)
    }

    const saveChangesHandler = async () => {
        if (!form.projectName) return setMessage('Имя проекта не должно быть пустым!', 'error', 'projects-page')
        if (form.projectName.length > 25) return setMessage('Название проекта более 25 символов!', 'error', 'projects-page')
        if (form.description.length > 50) return setMessage('Описание проекта более 50 символов!', 'error', 'projects-page')
        try {
            const response = await editProject(form, project._id, newTasks, deletedTasksId, 'editProject')
            setMessage(response.message, 'success', 'projects-page')
            await fetchProjectData('ProjectItem: fetch projects and tasks')
            cancelEdit() //Закрыли компонент, редактирующий проекты
        } catch(e) {
            setMessage(e.message, 'error', 'projects-page')
        }
    }

    const deleteProjectHandler = async () => {
        try {
            const response = await deleteProject(project._id, 'deleteProject')
            setMessage(response.message, 'success', 'projects-page')
            await fetchProjectData('ProjectItem: fetch projects and tasks')
            cancelEdit() //Закрыли компонент, редактирующий проекты
        } catch(e) {
            setMessage(e.message, 'error', 'projects-page')
        }
    }

    const editStart = () => {
        if (isAddNewProject) return setMessage('Сначала завершите создание нового проекта!', 'error', 'projects-page')
        changeIsEdit(project._id)
    }

    const addTaskItemProps = {
        isAddTask,
        setIsAddTask,
        taskName,
        setTaskName,
        addTask,
        plusLogo: images.plusLogo,
    }

    return (
        <li className='project-item' >
            <ul>
                <li className='text editor' >
                    {
                        (isEdit === project._id)
                            ? <>
                                <button
                                    onClick={ saveChangesHandler }
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
                                    onClick={ deleteProjectHandler }
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
                    <TaskList
                            xLogo={ images.xLogo }
                            isEdit={ isEdit === project._id }
                            newTasks={ newTasks }
                            showingTasks={ showingTasks }
                            deleteExistingTask={ deleteExistingTask }
                            deleteNewTask={ deleteNewTask }
                            addTaskItemProps={ addTaskItemProps }
                    />
                </li>
            </ul>
        </li>
    )
}

export default ProjectItem