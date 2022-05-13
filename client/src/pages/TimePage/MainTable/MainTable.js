import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../hooks/useFetchData'
import MainTableHeader from './MainTableHeader/MainTableHeader'
import MainTableDays from './MainTableDays/MainTableDays'
import MainTableItems from './MainTableItems/MainTableItems'
import TableTotal from './TableTotal/TableTotal'
import TableWeek from './TableWeek/TableWeek'
import './MainTable.css'
import { useMessage } from '../../../hooks/useMessage'

const MainTable = ({ content }) => {

    const { loading, fetchTimesSheet } = useFetchData()
    const { message, setMessage, showMessage } = useMessage()

    const [update, setUpdate] = useState(new Date().getSeconds())
    const { activeItem } = useSelector(state => state)
    const { selectedWeek } = useSelector(state => state.app)
    // Заставляем этот корневой компонент рендериться 2 раза в минуту, если есть активная задача
    useEffect(() => {
        console.log('MainTable: render')
        if (activeItem) {
            setTimeout(() => {
                if(update !== new Date().getSeconds()) setUpdate(new Date().getSeconds())
              }, 30000);
        }
      }, [activeItem, update])
    // Заставляем этот корневой компонент запрашивать новую неделю при ее изменении
    useEffect(() => {
        fetchTimesSheet(selectedWeek[0], 'MainTable: fetch TimesSheet')
    }, [selectedWeek[0]])

    return (
        <div className='main-table'>
            <MainTableHeader content={ content } />
            <button onClick={() => setMessage('message', 'success', 'main-table-page')} >X</button>
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