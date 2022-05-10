import React, { useState } from 'react'
import images from '../../../components/img/img'
import './NewProjectItem.css'

const NewProjectItem = ({ cancelProjectAddition, setMessage, token, request, fetchData, logout }) => {

    const [isAddTask, setIsAddTask] = useState(false)
    const [form, setForm] = useState({ projectName: '', description: '' })
    const [taskName, setTaskName] = useState('')
    const [newTasks, setNewTasks] = useState([])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const getTasks = () => {
        return (
            newTasks.map( (task, index) => {
                return (
                    <li className='task-item' key={ index }>
                        <p className='text' > { task.name } </p>
                        <button onClick={ () => deleteTask(index) } >
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
        if (event.code !== 'Enter') return //Срабатывает только на Enter
        if (!taskName) return setMessage({ message: 'Имя задачи не должно быть пустым!', type: 'error' })
        if (taskName.length > 25) return setMessage({ message: 'Имя задачи более 25 символов!', type: 'error' })
        setNewTasks([...newTasks, { name: taskName }])    // Добавляем имя задачи, id проекта и пользователя добавятся на сервере
        setIsAddTask(false) // Отключаем редактор задач
        setTaskName('') //Далее очищаем сопутствующие поля
    }

    const deleteTask = index => {
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

    const saveChanges = async () => {
        if (!form.projectName) return setMessage({ message: 'Имя проекта не должно быть пустым!', type: 'error' })
        if (form.projectName.length > 25) return setMessage({ message: 'Название проекта более 25 символов!', type: 'error' })
        if (form.description.length > 50) return setMessage({ message: 'Описание проекта более 50 символов!', type: 'error' })
        try {
            const response = await request(
                '/api/project/create',
                'POST',
                { ...form, newTasks },
                { Authorization: `Bearer ${token}` }
            )
            setMessage({ message: response.message, type: 'success' })
            await fetchData()
            cancelProjectAddition() //Закрыли компонент, добавляющий проекты
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
            setMessage({ message: e.message, type: 'error' })
        }
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