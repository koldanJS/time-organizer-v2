import React, { useState } from 'react'
import TableItem from './TableItem/TableItem'
import EmptyItem from './EmptyItem/EmptyItem'
// import { getDateString, msPerMin, stopTracking, useSimpledStore, useUpdate } from '../../../../../functions/functions'
// import axiosHandler from '../../../../../axios/axiosHandler'
import './MainTableItems.css'
import { useSelector } from 'react-redux'
import { getAdditionTime, msPerMin } from '../../../../functions'

const MainTableItems = ({ isLoading = false }) => {

    const { timesSheet } = useSelector(state => state)
    const { offset, selectedDate, activeEntry } = useSelector(state => state.app)

    // setInterval(() => { //Каждые 10 сек обновлять таблицу времени новыми данными (без асинхронных запросов)
    //     if (user.activeEntry) { //Если есть активная запись
    //         if (user?.activeEntry?.timesSheetId !== getDateString()) {  //Если начался новый день
    //             stopTracking( user, userId, axiosHandler, getUpdate )    //Выключить активную запись
    //         }
    //         setTimeUpdate(Math.round(new Date().getSeconds()/30))   //Если есть активная запись, обновить таблицу каждые 30 сек
    //     }
    // }, 20000);
    // console.log('render TableItems ', new Date().getHours(), ':', new Date().getMinutes(), ':', new Date().getSeconds())


    const getContent = () => {
        const dayItems = timesSheet.days[selectedDate.dayNumber].items    //Получили массив задач на выбранный день
        if (!dayItems.length) return <EmptyItem />
        return dayItems.map((item, index) => {
            let itemProps = {...item, index}
            if (
                !offset &&  //Что текущий день, иначе априори не активна
                activeEntry &&     //Что есть активные записи
                activeEntry.entryNumber === index  //Для записи, индекс которой соответствует активной
            ) {
                itemProps.isActive = true
                itemProps.totalTime += getAdditionTime(activeEntry)
            }
            return <TableItem key={index} {...itemProps} />
        })
    }

    return (
        <div className='main-table-items'>
            {
                isLoading
                    ? <EmptyItem isLoading={true} />
                    : getContent()
            }
        </div>
    )
}

export default MainTableItems