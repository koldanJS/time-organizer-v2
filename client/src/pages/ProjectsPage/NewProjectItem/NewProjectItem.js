import React, { useState } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import TaskList from '../TaskList/TaskList'
import images from '../../../components/img/img'
import './NewProjectItem.css'

const NewProjectItem = ({ cancelProjectAddition, setMessage }) => {

    const { fetchProjectData, createProject } = useFetchData()
    const [isAddTask, setIsAddTask] = useState(false)
    const [form, setForm] = useState({ projectName: '', description: '' })
    const [taskName, setTaskName] = useState('')
    const [newTasks, setNewTasks] = useState([])

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

    const deleteNewTask = index => {
        setNewTasks(newTasks.filter((task, i) => i !== index))  // Отфильтровать из массива задачу с таким индексом
    }

    const saveChanges = async () => {
        if (!form.projectName) return setMessage('Имя проекта не должно быть пустым!', 'error', 'projects-page')
        if (form.projectName.length > 25) return setMessage('Название проекта более 25 символов!', 'error', 'projects-page')
        if (form.description.length > 50) return setMessage('Описание проекта более 50 символов!', 'error', 'projects-page')
        try {
            const response = await createProject(form, newTasks, 'createProject')
            setMessage(response.message, 'success', 'projects-page')
            await fetchProjectData('ProjectItem: fetch projects and tasks')
            cancelProjectAddition() //Закрыли компонент, добавляющий проекты
        } catch(e) {
            setMessage(e.message, 'error', 'projects-page')
        }
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
                        name='projectName'
                        value={ form.projectName }
                        placeholder='Название проекта...'
                        onChange={ changeHandler }
                    />
                </li>
                <li className='text description' >
                    <textarea
                        className='edit-project text'
                        name='description'
                        value={ form.description }
                        placeholder='Описание проекта...'
                        onChange={ changeHandler }
                    />
                </li>
                <li className='tasks' >
                    <TaskList
                            xLogo={ images.xLogo }
                            newTasks={ newTasks }
                            deleteNewTask={ deleteNewTask }
                            addTaskItemProps={ addTaskItemProps }
                    />
                </li>
            </ul>
        </li>
    )
}

export default NewProjectItem