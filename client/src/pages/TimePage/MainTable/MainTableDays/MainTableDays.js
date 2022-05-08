import React from 'react'
// import { changeData } from '../../../../../redux/actions/appStateActions/timeStateActions'
// import { getAddition, getDateString, getFormatTime, getRange, getTotalTime, useSimpledStore } from '../../../../../functions/functions'
import DayItem from './DayItem/DayItem'
import DayTotal from './DayTotal/DayTotal'
import './MainTableDays.css'

const MainTableDays = () => {

    const { user, offset, selectedDate, selectedWeek, dispatch } = {} //useSimpledStore()

    const getDayItems = () => {     //isTimeOn чтоб появлялись часики
        // const offsetMin = getRange(offset)[0]   //Получить смещение для понедельника, относительно текущего дня
        // return [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ].map((day, index) => {
        //     return {
        //         isActive: selectedDate.dayNumber === index + 1,
        //         day,
        //         totalTime: getTotalTime(index + 1, user, selectedWeek) + getAddition( user, selectedWeek, getDateString(offset + offsetMin + index) )
        //     }
        // })
    }
    const dayItems = [] //getDayItems()

    const getFormatTotalTime = () => {
        // const totalTime = dayItems.reduce((sum, item) => {
        //     return sum += item.totalTime
        // }, 0)
        // return getFormatTime(totalTime)
    }

    const clickHandler = index => {
        // const selectedDayNumber = selectedDate.dayNumber
        // const newSelectedDayNumber = index
        // dispatch(changeData(newSelectedDayNumber - selectedDayNumber))
    }
    
    return (
        <div className='main-table-days'>
            {
                dayItems.map((item, index) => {
                    return <DayItem key={index} clickHandler={() => clickHandler(index + 1)} {...item} />
                })
            }
            <DayTotal totalTime={'getFormatTotalTime()'} />
        </div>
    )
}

export default MainTableDays