import React from 'react'
import TableItem from './TableItem/TableItem'
import EmptyItem from '../../../../components/EmptyItem/EmptyItem'
import { useSelector } from 'react-redux'
import { getAdditionTime, getDateString, getOffset, getSelectedWeek } from '../../../../functions'
import './MainTableItems.css'

const MainTableItems = ({ isLoading = false }) => {

    const { timesSheet, activeItem } = useSelector(state => state)
    const { offset, selectedDate } = useSelector(state => state.app)

    const getContent = () => {
        if (!timesSheet) return <EmptyItem />
        const dayItems = timesSheet.days[selectedDate.dayNumber].items    //Получили массив задач на выбранный день
        if (!dayItems.length) return <EmptyItem />
        return dayItems.map((item, index) => {
            let itemProps = {...item, index}
            let activeOffset = 0
            if (activeItem) activeOffset = getOffset(getDateString(0, activeItem.startTime))  // Если пользователь забыл выключить запись в другом дне
            if (
                activeItem &&   // Есть активная запись
                activeItem.itemIndex === index &&  //Для записи, индекс которой соответствует активной
                getSelectedWeek(activeOffset)[0] === getSelectedWeek(offset)[0]    // Они входят в одну неделю
            ) {
                itemProps.isActive = true
                itemProps.totalTime += getAdditionTime(activeItem)
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