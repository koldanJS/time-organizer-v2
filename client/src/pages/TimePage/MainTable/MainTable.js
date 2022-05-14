import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import { useMessage } from '../../../hooks/useMessage'
import { getDateString, getOffset } from '../../../functions'
import MainTableHeader from './MainTableHeader/MainTableHeader'
import MainTableDays from './MainTableDays/MainTableDays'
import MainTableItems from './MainTableItems/MainTableItems'
import TableTotal from './TableTotal/TableTotal'
import TableWeek from './TableWeek/TableWeek'
import './MainTable.css'

const MainTable = ({ content }) => {

    const { loading, fetchTimesSheet } = useFetchData()

    const { permanentMessage, setPermanentMessageState, showPermanentMessage } = useMessage()

    const [update, setUpdate] = useState(new Date().getSeconds())
    const { activeItem } = useSelector(state => state)
    const { selectedWeek } = useSelector(state => state.app)
    const { token } = useSelector(state => state.auth)

    // Активная запись м.б. только сегодня, иначе нужно сообщить пользователю
    if (activeItem && getOffset(getDateString(0, activeItem.startTime)) === 0) {
        if (permanentMessage) setPermanentMessageState(null)
    }
    if (activeItem && getOffset(getDateString(0, activeItem.startTime)) !== 0) {
        if (!permanentMessage) setPermanentMessageState(`У вас есть активная запись ${getDateString(0, activeItem.startTime)}!!!`, 'error')
    }

    // Заставляем этот корневой компонент рендериться 2 раза в минуту, если есть активная задача
    useEffect(() => {
        if (activeItem) {
            setTimeout(() => {
                if(update !== new Date().getSeconds()) setUpdate(new Date().getSeconds())
              }, 30000);
        }
      }, [activeItem, update])
    // Заставляем этот корневой компонент запрашивать новую неделю при ее изменении
    useEffect(() => {
        fetchTimesSheet(selectedWeek[0], token, 'MainTable: fetch TimesSheet')
    }, [selectedWeek[0]])

    return (
        <div className='main-table'>
            <MainTableHeader content={ content } />
            {
                permanentMessage
                    ? showPermanentMessage()
                    : null
            }
            {
                content === 'day'
                    ? <>
                        <MainTableDays />
                        <hr className='demiliter' />
                        <MainTableItems isLoading={ loading } />
                    </>
                    : <TableWeek isLoading={ loading } />
            }
            <TableTotal content={ content } />
        </div>
    )
}

export default MainTable