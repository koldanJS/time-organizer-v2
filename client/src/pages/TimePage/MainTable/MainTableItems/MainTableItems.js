import React from 'react'
import TableItem from './TableItem/TableItem'
import EmptyItem from '../../../../components/EmptyItem/EmptyItem'
import { useSelector } from 'react-redux'
import { getAdditionTime } from '../../../../functions'
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
            if (
                !offset &&  //Что текущий день, иначе априори не активна
                activeItem &&     //Что есть активные записи
                activeItem.itemIndex === index  //Для записи, индекс которой соответствует активной
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