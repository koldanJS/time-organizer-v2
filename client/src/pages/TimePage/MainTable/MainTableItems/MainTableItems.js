import React, { useState } from 'react'
import TableItem from './TableItem/TableItem'
import EmptyItem from './EmptyItem/EmptyItem'
// import { getDateString, msPerMin, stopTracking, useSimpledStore, useUpdate } from '../../../../../functions/functions'
// import axiosHandler from '../../../../../axios/axiosHandler'
import './MainTableItems.css'

const MainTableItems = () => {

    const [timeUpdate , setTimeUpdate] = useState(0)
    const { userId, user, projects, tasks, isLoading, selectedDate, offset } = {} //useSimpledStore()
    // const { getUpdate } = useUpdate()
    // const keySelectedDate = selectedDate.dateString

    // setInterval(() => { //Каждые 10 сек обновлять таблицу времени новыми данными (без асинхронных запросов)
    //     if (user.activeEntry) { //Если есть активная запись
    //         if (user?.activeEntry?.timesSheetId !== getDateString()) {  //Если начался новый день
    //             stopTracking( user, userId, axiosHandler, getUpdate )    //Выключить активную запись
    //         }
    //         setTimeUpdate(Math.round(new Date().getSeconds()/30))   //Если есть активная запись, обновить таблицу каждые 30 сек
    //     }
    // }, 20000);
    // console.log('render TableItems ', new Date().getHours(), ':', new Date().getMinutes(), ':', new Date().getSeconds())

    const getCurrentEntry = (item, index) => {
        // const projectName = projects[item.projectId]?.projectName
        // const taskName = tasks[item.taskId]?.taskName
        // const description = item.description
        // let totalTime = item.totalTime
        // const isActive = (
        //     !offset &&  //Что текущий день, иначе априори не активна
        //     user.activeEntry &&     //Что есть активные записи
        //     user.activeEntry.entryNumber === index  //Для записи, индекс которой соответствует активной
        // )
        // if (isActive) totalTime += Math.round( (Date.now() - user.activeEntry.startTime) / msPerMin )
        // return { projectName, taskName, description, totalTime, isActive, index }
    }

    const getContent = () => {
        // const timesSheets = user.timesSheets || {}
        // const tableItems = []
        // const timesSheet = timesSheets[keySelectedDate]    //Получили массив задач в текущей таблице
        // if (!timesSheet) return <EmptyItem />
        // timesSheet.forEach((item, index) => {     //Наполнили TableItem объектами, схожими с timesSheet, но с именами вместо id
        //     tableItems.push({ ...getCurrentEntry(item, index) })
        // })
        // return (
        //     tableItems.map((item, index) => {
        //         return <TableItem key={index} {...item} />
        //     })
        // )
    }

    return (
        <div className='main-table-items'>
            {
                'isLoading'
                    ? <EmptyItem isLoading={true} />
                    : getContent()
            }
        </div>
    )
}

export default MainTableItems