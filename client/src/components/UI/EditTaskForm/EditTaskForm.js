import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { controlTime, getDayNumber, getFormatTime, getTimeNumber } from '../../../functions'
import { useFetchData } from '../../../hooks/useFetchData'
import ButtonForm from '../ButtonForm/ButtonForm'
import Select from '../Select/Select'
import './EditTaskForm.css'
// Формы идентичны, сделать одним компонентом
const EditTaskForm = ({ closeFormHandler, index }) => {

    const { fetchNewTaskItem } = useFetchData()

    const { offset, selectedDate } = useSelector(state => state.app)
    const { projects, tasks, timesSheet } = useSelector(state => state)

    const currentDay = timesSheet.days[getDayNumber(offset)] // Текущий день
    const [form, setForm] = useState({
        projectId: currentDay.items[index].projectId,
        taskId: currentDay.items[index].taskId,
        description: currentDay.items[index].description,
        timeString: getFormatTime(currentDay.items[index].totalTime)
    })
   
    const getText = () => {
        return `Редактировать запись на ${selectedDate.day.toLowerCase()}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort.toLowerCase()}`
    }

    const getTextItem = (name, /*keyName, client*/) => {    // keyName, client на будущее
        // if (keyName) return `[${keyName}] ${name} (${client})`
        // if (client) return `${name} (${client})`
        return name
    }
    
    const getOptions = () => {
        return {
            projects: projects.map( project => {
                return {
                        id: project._id,
                        text: getTextItem(project.name, /*project.keyName, project.client*/)
                }
            }),
            tasks: tasks
                .filter(task => task.project === form.projectId)  // Работаем только с задачами текущего проекта
                .map( task => {
                    return {
                        id: task._id,
                        text: task.name,
                    }
            })
        }
    }

    const changeHandler = (event, isSetTask, control, max) => {
        const newValue = event.target.value
        if (control && !control(newValue)) return
        if (max && newValue.length > max) return
        if (isSetTask) {
            const filtredTasks = tasks.filter(task => task.project === newValue)
            const newTaskId = filtredTasks[0] ? filtredTasks[0]._id : ''
            setForm({...form, [event.target.name]: newValue, taskId: newTaskId })
        } else {
            setForm({...form, [event.target.name]: newValue})
        }
    }

    const blurHandler = () => {
        const timeNumber = getTimeNumber(form.timeString)
        const newTimeString = getFormatTime(timeNumber)
        setForm({...form, timeString: newTimeString})
    }

    const submitHandler = async event => {
        event.preventDefault()
        const editItem = {  // Создаем редактированную запись
            description: form.description,
            projectId: form.projectId,
            projectName: projects.find(project => project._id === form.projectId).name,
            taskId: form.taskId,
            taskName: tasks.find(task => task._id === form.taskId).name,
            totalTime: getTimeNumber(form.timeString)
        }
        try {
            // Отправляем ее в БД и ждем ответ
            await fetchNewTaskItem(timesSheet._id, getDayNumber(offset), editItem, 'EditTaskForm (edit): fetchNewTaskItem', index)
            closeFormHandler()
        } catch(e) {
            console.log(e.message)
        }
    }

    const deleteHandler = async () => {
        try {
            await fetchNewTaskItem(timesSheet._id, getDayNumber(offset), null, 'EditTaskForm (edit): fetchNewTaskItem', index, true)
            closeFormHandler()
        } catch(e) {
            console.log(e.message)
        }
    }

    return (
        <div className='hide-all' >
            <div className='add-task-form'>
                <div className='head' >
                    <p className='text' >{ getText() }</p>
                </div>
                <form onSubmit={submitHandler} >
                    <Select
                        label='Проект'
                        name='projectId'
                        value={ form.projectId }
                        onChange={ (e) => changeHandler(e, true) }
                        options={ getOptions().projects }
                    />
                    <Select
                        label='Задача'
                        name='taskId'
                        value={ form.taskId }
                        onChange={ changeHandler }
                        options={ getOptions().tasks }
                    />
                    <textarea
                        className='description text'
                        placeholder='Примечания (необязательно)'
                        name='description'
                        value={ form.description }
                        onChange={ (e) => changeHandler(e, false, null, 50) }
                    />
                    <textarea
                        className='time text size-30'
                        placeholder='0:00'
                        name='timeString'
                        value={ form.timeString }
                        onChange={ (e) => changeHandler(e, false, controlTime) }
                        onBlur={ blurHandler }
                    />
                    <ButtonForm
                        classType='success'
                        type='submit'
                    >
                        <p className='text color-white' >Редактировать запись</p>
                    </ButtonForm>
                    <ButtonForm
                        type='button'
                        clickHandler={closeFormHandler}
                    >
                        <p className='text' >Отмена</p>
                    </ButtonForm>
                    <ButtonForm
                        classType='delete'
                        type='button'
                        clickHandler={deleteHandler}
                    >
                        <p className='text' >Удалить</p>
                    </ButtonForm>
                </form>
            </div>
        </div>
    )
}

export default EditTaskForm