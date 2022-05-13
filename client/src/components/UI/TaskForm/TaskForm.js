import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import { useMessage } from '../../../hooks/useMessage'
import { controlTime, getDayNumber, getFormatTime, getTimeNumber} from '../../../functions'
import ButtonForm from '../ButtonForm/ButtonForm'
import Select from '../Select/Select'
import './TaskForm.css'

const TaskForm = ({ typeForm, closeFormHandler, index }) => {

    const { createTimesSheet, fetchNewTaskItem, startTracking, stopTracking } = useFetchData()
    const { setMessageState } = useMessage()

    const { offset, selectedDate, selectedWeek } = useSelector(state => state.app)
    const { projects, tasks, timesSheet, activeItem } = useSelector(state => state)
    
    const getStartState = (typeForm) => {
        if (typeForm === 'edit') {
            const currentDay = timesSheet.days[getDayNumber(offset)] // Текущий день
            return {
                projectId: currentDay.items[index].projectId,
                taskId: currentDay.items[index].taskId,
                description: currentDay.items[index].description,
                timeString: getFormatTime(currentDay.items[index].totalTime)
            }
        }
        if (typeForm === 'add') {
            const startProjectId = projects[0] ? projects[0]._id : ''
            const filtredTasks = tasks.filter(task => task.project === startProjectId)
            const startTaskId = filtredTasks[0] ? filtredTasks[0]._id : ''
            return {
                projectId: startProjectId,
                taskId: startTaskId,
                description: '',
                timeString: ''
            }
        }
    }
    const [form, setForm] = useState(getStartState(typeForm))
    const isDisabled = !tasks.find(task => task._id === form.taskId) /* Проверка, что выбрана существующая задача, т.к. задачи и проекты м.б. удалены,
    а проверка задачи достаточна и для проектов. Если удалены проект/задача, кнопка будет отключена, пока их не сменить, хотя без изменений удаленные
    проект и задача по прежнему будут корректно отображаться и их даже можно архивировать */

    const getText = () => {
        return `${typeForm === 'add' ? 'Новая ' : 'Редактировать'} запись на ${selectedDate.day.toLowerCase()}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort.toLowerCase()}`
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
        if (control && !control(newValue)) return setMessageState('Допустимый формат hh:mm!', 'error', 'main-table-page')
        if (max && newValue.length > max) return setMessageState(`Максимальная длина ${max} символов!`, 'error', 'main-table-page')
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
        const newItem = {   // Создаем новую/редактированную запись
            description: form.description,
            projectId: form.projectId,
            projectName: projects.find(project => project._id === form.projectId).name,
            taskId: form.taskId,
            taskName: tasks.find(task => task._id === form.taskId).name,
            totalTime: getTimeNumber(form.timeString)
        }
        // Отправляем ее в БД и ждем ответ
        try {
            if (typeForm === 'add') {
                let editTimesSheet = timesSheet   // Таблица может отсутствовать, если ее еще не создавали
                if (!timesSheet) editTimesSheet = await createTimesSheet(selectedWeek[0], 'TaskForm :createTimesSheet')
                if (!offset) {  // Если запись добавляем сегодня, то она становится активной
                    if (activeItem) await stopTracking('addTaskItem: stopTracking') // Если уже была активная, останавливаем
                    const dayItems = editTimesSheet.days[getDayNumber(offset)].items    // Получили массив записей задач
                    await startTracking(dayItems.length, 'addTaskItem: startTracking')  // Добавляем активную запись
                } 
                await fetchNewTaskItem(editTimesSheet._id, getDayNumber(offset), newItem, 'AddTaskForm: fetchNewTaskItem')
                setMessageState('Запись добавлена!', 'success', 'main-table-page')
            }
            if (typeForm === 'edit') {
                await fetchNewTaskItem(timesSheet._id, getDayNumber(offset), newItem, 'EditTaskForm (edit): fetchNewTaskItem', index)
                setMessageState('Запись отредактирована!', 'success', 'main-table-page')
            }
            closeFormHandler()  // Закрываем форму
        } catch(e) {
            console.log(e.message)
        }
    }

    const deleteHandler = async () => {
        try {
            await fetchNewTaskItem(timesSheet._id, getDayNumber(offset), null, 'EditTaskForm (edit): fetchNewTaskItem', index, true)
            setMessageState('Запись удалена!', 'success', 'main-table-page')
            closeFormHandler()
        } catch(e) {
            console.log(e.message)
        }
    }

    return (
        <div className='hide-all' >
            <div className='task-form'>
                <div className='head' >
                    <p className='text' >{ getText() }</p>
                </div>
                <form onSubmit={ submitHandler } >
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
                    <ButtonForm classType='success' type='submit' disabled={ isDisabled } >
                        <p className='text color-white' >
                            {(typeForm === 'edit')
                                ? 'Редактировать запись'
                                : offset
                                    ? 'Добавить запись'
                                    : 'Запустить таймер'
                            }
                        </p>
                    </ButtonForm>
                    <ButtonForm type='button' clickHandler={ closeFormHandler } >
                        <p className='text' >Отмена</p>
                    </ButtonForm>
                    {(typeForm === 'edit')
                        ? <ButtonForm
                            classType='delete'
                            type='button'
                            clickHandler={deleteHandler}
                        >
                            <p className='text' >Удалить</p>
                        </ButtonForm>
                        : null
                    }
                </form>
            </div>
        </div>
    )
}

export default TaskForm