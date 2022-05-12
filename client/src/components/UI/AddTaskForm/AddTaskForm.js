import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import { controlTime, getDayNumber, getFormatTime, getTimeNumber} from '../../../functions'
import ButtonForm from '../ButtonForm/ButtonForm'
import Select from '../Select/Select'
import './AddTaskForm.css'
// Формы идентичны, сделать одним компонентом
const AddTaskForm = ({ closeFormHandler }) => {

    const { fetchNewTaskItem, startTracking, stopTracking } = useFetchData()

    const { offset, selectedDate } = useSelector(state => state.app)
    const { projects, tasks, timesSheet, activeItem } = useSelector(state => state)

    const startProjectId = projects[0] ? projects[0]._id : ''
    const filtredTasks = tasks.filter(task => task.project === startProjectId)
    const startTaskId = filtredTasks[0] ? filtredTasks[0]._id : ''

    const [form, setForm] = useState({
        projectId: startProjectId,
        taskId: startTaskId,
        description: '',
        timeString: ''
    })
   
    const getText = () => {
        return `Новая запись на ${selectedDate.day.toLowerCase()}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort.toLowerCase()}`
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
        try {
            if (!offset) {  // Если запись добавляем сегодня, то она становится активной
                if (activeItem) await stopTracking('addTaskItem: stopTracking') // Если уже была активная, останавливаем
                const dayItems = timesSheet.days[getDayNumber(offset)].items    // Получили массив записей задач
                await startTracking(dayItems.length, 'addTaskItem: startTracking')  // Добавляем активную запись
            } 
            const newItem = {   // Создаем шаблон новой записи
                description: form.description,
                projectId: form.projectId,
                projectName: projects.find(project => project._id === form.projectId).name,
                taskId: form.taskId,
                taskName: tasks.find(task => task._id === form.taskId).name,
                totalTime: getTimeNumber(form.timeString)
            }
            // Отправляем ее в БД и ждем ответ
            await fetchNewTaskItem(timesSheet._id, getDayNumber(offset), newItem, 'AddTaskForm: fetchNewTaskItem')
            closeFormHandler()  // Закрываем форму
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
                    {
                        offset
                            ? <ButtonForm classType='success' type='submit' >
                                <p className='text color-white' >Добавить запись</p>
                            </ButtonForm>
                            : <ButtonForm classType='success' type='submit' >
                                <p className='text color-white' >Запустить таймер</p>
                            </ButtonForm>
                    }
                    <ButtonForm type='button' clickHandler={closeFormHandler} >
                        <p className='text' >Отмена</p>
                    </ButtonForm>
                </form>
            </div>
        </div>
    )
}

export default AddTaskForm