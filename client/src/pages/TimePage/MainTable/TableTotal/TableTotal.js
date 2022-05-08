import React from 'react'
import Button from '../../../../components/UI/Button/Button'
// import { getFormatTime, getTotalTime, useSimpledStore, getAddition, getSelectedWeek, getDate, getRange, stopTracking, useUpdate, getDateString } from '../../../../../functions/functions'
// import axiosHandler from '../../../../../axios/axiosHandler'
import './TableTotal.css'

const TableTotal = ({ content }) => {

    const { user, userId, projects, tasks, selectedDate, selectedWeek, offset } = {} //useSimpledStore()
    // const { getUpdate } = useUpdate()

    const time = '' //getFormatTime(getTotalTime(selectedDate.dayNumber, user, selectedWeek) + getAddition( user, selectedWeek ))

    const clickHandler = async () => {
        // const weekRange = getRange(offset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
        // const offsetRange = [weekRange[0] + offset, weekRange[1] + offset]  //Диапазон смещений для [Пн, Вс] относительно сегодня

        // if (user.activeEntry && ((offsetRange[0] <= 0) && (offsetRange[1] >= 0))) { //Если активная запись входит в архивируемую неделю
        //     stopTracking(user, userId, axiosHandler, getUpdate) //То остановить ее
        // }

        // const selectedWeek = getSelectedWeek(offset)

        // const datePeriod = getDateString(offsetRange[0]) + '_' + getDateString(offsetRange[1])
        // console.log('datePeriod', datePeriod)

        // const archiveItems = {}
        // const timesSheets = user.timesSheets
        // const currentTimesSheets = {}
        // selectedWeek.forEach(dateString => {   //Получаем все временные таблицы архивируемой недели
        //     if (timesSheets[dateString]) {
        //         currentTimesSheets[dateString] = timesSheets[dateString]
        //     }
        // })

        // Object.keys(currentTimesSheets).forEach(dateString => {
        //     const arrItems = currentTimesSheets[dateString]
        //     for (const item of arrItems) {
        //         const key = item.projectId + item.taskId
        //         const newItem = {...archiveItems[key]}
        //         newItem.projectName = projects[item.projectId].projectName
        //         newItem.taskName = tasks[item.taskId].taskName
        //         newItem[dateString] = (newItem[dateString] || 0) + item.totalTime
        //         archiveItems[key] = {...archiveItems[key], ...newItem}
        //     }
        // })

        // let arrOfArchiveItems = Object.values(archiveItems)
        // console.log('arrOfArchiveItems', arrOfArchiveItems)

        // const newArchive = {...user.archive, [datePeriod]: arrOfArchiveItems}

        // await axiosHandler.put(`/users/${userId}/archive.json`, newArchive)
        // await getUpdate()
    }

    return (
        <div className='table-total'>
            {
                content === 'day'
                    ? <div className='total' >
                        <p className='text size-20 width-700' >Итого:</p>
                        <p className='text' >{ time }</p>
                    </div>
                    : null
            }
            <div className='submit-week' >
                {
                    content === 'day'
                        ? <Button clickHandler={ clickHandler } >
                            <p className='text' >Архивировать недельный отчет</p>
                        </Button>
                        : null
                }
            </div>
        </div>
    )
}

export default TableTotal