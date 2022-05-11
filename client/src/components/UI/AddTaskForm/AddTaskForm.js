import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import { controlTime, getDayNumber, getFormatTime, getNewActiveItem, getTimeNumber, stopTracking } from '../../../functions'
import ButtonForm from '../ButtonForm/ButtonForm'
import Select from '../Select/Select'
import './AddTaskForm.css'

const AddTaskForm = ({ closeFormHandler }) => {

    const { fetchNewTaskItem, loading } = useFetchData()

    const { offset, selectedDate } = useSelector(state => state.app)
    const { projects, tasks, timesSheet, activeItem } = useSelector(state => state)

    const startProjectId = projects[0] ? projects[0]._id : ''
    const filtredTasks = tasks.filter(task => task.project === startProjectId)
    const startTaskId = filtredTasks[0] ? filtredTasks[0]._id : ''

    const [currentProjectId, setCurrentProjectId] = useState(startProjectId)
    const [currentTaskId, setCurrentTaskId] = useState(startTaskId)
    const [description, setDescription] = useState('')
    const [timeString, setTimeString] = useState('')
   
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
                .filter(task => task.project === currentProjectId)  // Работаем только с задачами текущего проекта
                .map( task => {
                    return {
                        id: task._id,
                        text: task.name,
                    }
            })
        }
    }

    const changeHandler = (event, setState, control) => {
        const newValue = event.target.value
        if (control && !control(newValue)) return
        setState(newValue)
    }

    const blurHandler = () => {
        const timeNumber = getTimeNumber(timeString)
        const newTimeString = getFormatTime(timeNumber)
        setTimeString(newTimeString)
    }

    const submitHandler = async event => {
        event.preventDefault()
        const newItem = {
            description: description,
            projectId: currentProjectId,
            projectName: projects.find(project => project._id === currentProjectId).name,
            taskId: currentTaskId,
            taskName: tasks.find(task => task._id === currentTaskId).name,
            totalTime: getTimeNumber(timeString)
        }
        let dayItems = [ ...timesSheet.days[getDayNumber(offset)].items ]    // Из массива дней взяли текущий день, из него массив записей
        dayItems = [ ...dayItems, newItem ]   // Положили новую запись
        let newActiveItem = null
        let deletedActiveItemId = null
        if (!offset) {   //Если запись добавляют сегодня,
            if (activeItem) {   // то если уже была активная
                dayItems = stopTracking(dayItems, activeItem) // нужно ее разактивировать и переписать ее время, вернув новый массив
                deletedActiveItemId = activeItem._id
            }
            const newItemIndex = dayItems.length - 1
            newActiveItem = getNewActiveItem(newItemIndex)    // Создать новую активную запись
            console.log('newActiveItem', newActiveItem)
        }
        let newDays = [ ...timesSheet.days ]  // Получили массив дней текущей недели для редактирования
        newDays[getDayNumber(offset)].items = dayItems  // Заменили для выбранного дня поле items на созданный ранее массив dayItems
        const newTimesSheet = { ...timesSheet, days: newDays }
        console.log('newTimesSheet', newTimesSheet)
        // Все это не изменило данные, а только создало временное состояние, только после успешного ответа сервера состояние сохранится и можно изменить state в redux
        await fetchNewTaskItem(activeItem, deletedActiveItemId, newActiveItem, newTimesSheet, 'AddTaskForm: fetchNewTaskItem')
        closeFormHandler()  // Закрываем форму
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
                        value={currentProjectId}
                        onChange={e => changeHandler(e, setCurrentProjectId)}
                        options={getOptions().projects}
                    />
                    <Select
                        label='Задача'
                        value={currentTaskId}
                        onChange={e => changeHandler(e, setCurrentTaskId)}
                        options={getOptions().tasks}
                    />
                    <input
                        className='description text'
                        placeholder='Примечания (необязательно)'
                        value={description}
                        onChange={(e) => changeHandler(e, setDescription)}
                    />
                    <input
                        className='time text size-30'
                        placeholder='0:00'
                        value={timeString}
                        onChange={(e) => changeHandler(e, setTimeString, controlTime)}
                        onBlur={blurHandler}
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