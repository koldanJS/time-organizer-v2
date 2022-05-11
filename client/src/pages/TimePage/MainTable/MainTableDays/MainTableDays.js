import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOffset } from '../../../../redux/actions/appActions'
import { getFormatTime, getRange, getTotalTime } from '../../../../functions'
import DayItem from './DayItem/DayItem'
import DayTotal from './DayTotal/DayTotal'
import './MainTableDays.css'

const MainTableDays = () => {

    const dispatch = useDispatch()
    const { offset, selectedDate, selectedWeek } = useSelector(state => state.app)
    const { timesSheet } = useSelector(state => state)

    const getDayItems = () => {     //isTimeOn чтоб появлялись часики
        // const offsetMin = getRange(offset)[0]   //Получить смещение для понедельника, относительно текущего дня
        return timesSheet.days.map((day, index) => {
            return {
                isActive: selectedDate.dayNumber === index,
                day: day.shortDay,
                totalTime: getTotalTime(day) //+ getAddition( user, selectedWeek, getDateString(offset + offsetMin + index) )
            }
        })
    }
    const dayItems = getDayItems()

    const getFormatTotalTime = () => {
        const totalTime = dayItems.reduce((sum, item) => {
            return sum += item.totalTime
        }, 0)
        return getFormatTime(totalTime)
    }

    const clickHandler = index => {
        const selectedDayNumber = selectedDate.dayNumber
        const newSelectedDayNumber = index
        dispatch(changeOffset(newSelectedDayNumber - selectedDayNumber))
    }
    
    return (
        <div className='main-table-days'>
            {
                dayItems.map((item, index) => {
                    return <DayItem key={index} clickHandler={() => clickHandler(index)} {...item} />
                })
            }
            <DayTotal totalTime={getFormatTotalTime()} />
        </div>
    )
}

export default MainTableDays