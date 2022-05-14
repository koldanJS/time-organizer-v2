import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOffset } from '../../../../redux/actions/appActions'
import { getAdditionTime, getDateString, getFormatTime, getOffset, getRange, getSelectedWeek, getTotalTime } from '../../../../functions'
import DayItem from './DayItem/DayItem'
import DayTotal from './DayTotal/DayTotal'
import './MainTableDays.css'

const MainTableDays = () => {

    const dispatch = useDispatch()
    const { offset, selectedDate } = useSelector(state => state.app)
    const { timesSheet, activeItem } = useSelector(state => state)

    const getDayItems = () => {     //isTimeOn чтоб появлялись часики
        if (!timesSheet) return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
            return {
                isActive: selectedDate.dayNumber === index,
                day,
                totalTime: 0
            }
        })
        return timesSheet.days.map((day, index) => {
            let additionTime = 0    // Расчитываем добавочное время, если в дне есть активная запись
            let activeOffset = 0
            if (activeItem) activeOffset = getOffset(getDateString(0, activeItem.startTime))  // Если пользователь забыл выключить запись в другом дне
            if (
                activeItem &&   // Есть активная запись
                activeItem.dayNumber === index &&   // Ее день совпадает с этим
                getSelectedWeek(activeOffset)[0] === getSelectedWeek(offset)[0]    // Они входят в одну неделю
            ) additionTime = getAdditionTime(activeItem)
            return {
                isActive: selectedDate.dayNumber === index,
                day: day.shortDay,
                totalTime: getTotalTime(day) + additionTime
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