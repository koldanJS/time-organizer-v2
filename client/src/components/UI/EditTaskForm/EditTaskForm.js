import React, { useState } from 'react'
// import { getFormatTime, getTimeNumber, controlTime, useSimpledStore, getDateString, useUpdate } from '../../../functions/functions'
// import { offEditForm } from '../../../redux/actions/appStateActions/appStateActions'
// import { asyncGetUser } from '../../../redux/actions/userActions'
// import axiosHandler from '../../../axios/axiosHandler'
import ButtonForm from '../ButtonForm/ButtonForm'
import Select from '../Select/Select'
import './EditTaskForm.css'

const EditTaskForm = ({ closeFormHandler, index }) => {

    const { userId, user, projects, tasks, offset, selectedDate, dispatch } = {} //useSimpledStore()
    // const { getUpdateCurrent } = useUpdate()

    // const currentEntry = user.timesSheets[getDateString(offset)][index]

    const [currentProjectId, setCurrentProjectId] = useState('currentEntry.projectId')
    const [currentTaskId, setCurrentTaskId] = useState('currentEntry.taskId')
    const [description, setDescription] = useState('currentEntry.description')
    const [timeString, setTimeString] = useState('getFormatTime(currentEntry.totalTime)')
   
    const getTextItem = (keyName, name, client) => {
        if (keyName) return `[${keyName}] ${name} (${client})`
        return `${name} (${client})`
    }
    
    const getProjectsOptions = () => user.projectsId.map(id => {
        // const project = projects[id]
        // return {
        //     id,
        //     text: getTextItem(project.keyName, project.projectName, project.client)
        // }
    })
    const getTasksOptions = (projectId) => projects[projectId].tasksId.map(id => {
        // return {
        //     id,
        //     text: tasks[id].taskName,
        // }
    })

    const getText = () => {
        // return `Редактировать запись на ${selectedDate.day.toLowerCase()}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort.toLowerCase()}`
    }

    const changeHandler = (event, setState, control) => {
        // const newValue = event.target.value
        // if (control && !control(newValue)) return
        // setState(newValue)
    }

    const blurHandler = () => {
        // const timeNumber = getTimeNumber(timeString)
        // const newTimeString = getFormatTime(timeNumber)
        // setTimeString(newTimeString)
    }

    const createEntry = async (newTimesSheet, currentDateString) => {
        // try {
        //     const urlEnd = `/users/${userId}/timesSheets/${currentDateString}.json`
        //     await axiosHandler.delete(urlEnd)
        //     await axiosHandler.put(urlEnd, newTimesSheet)
        //     getUpdateCurrent(asyncGetUser, userId)
        // } catch(e) {
        //     console.log('Не могу записать newTimesSheet: ', e)
        // }
    }

    const submitHandler = async event => {
        // event.preventDefault()
        // const newEntry = {
        //     description: description,
        //     isActive: !offset,
        //     projectId: currentProjectId,
        //     taskId: currentTaskId,
        //     totalTime: getTimeNumber(timeString)
        // }
        // const currentDateString = getDateString(offset)
        // const timesSheet = user.timesSheets[currentDateString] || []    //Начальное значение массива, при любом смещении
        // const newTimesSheet = timesSheet.map((item, i) => (i === index) ? newEntry : item )
        // await createEntry(newTimesSheet, currentDateString)
        // dispatch(offEditForm())
    }

    const deleteHandler = async () => {
        // console.log('delete ', index)
        // const currentDateString = getDateString(offset)
        // const timesSheet = user.timesSheets[currentDateString] || []    //Начальное значение массива, при любом смещении
        // const newTimesSheet = timesSheet.filter((item, i) => (i !== index) )
        // console.log('newTimesSheet ', newTimesSheet)
        // await createEntry(newTimesSheet, currentDateString)
        // dispatch(offEditForm())
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
                        options={getProjectsOptions()}
                        classType=''
                    />
                    <Select
                        label='Задача'
                        value={currentTaskId}
                        onChange={e => changeHandler(e, setCurrentTaskId)}
                        options={getTasksOptions(currentProjectId)}
                        classType=''
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
                        onChange={(e) => changeHandler(e, setTimeString, 'controlTime')}
                        onBlur={blurHandler}
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