import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MainTableHeader from './MainTableHeader/MainTableHeader'
import MainTableDays from './MainTableDays/MainTableDays'
import MainTableItems from './MainTableItems/MainTableItems'
import TableTotal from './TableTotal/TableTotal'
import TableWeek from './TableWeek/TableWeek'
import './MainTable.css'

const MainTable = ({ content }) => {

    // Заставляем этот корневой компонент рендериться 2 раза в минуту, если есть активная задача
    const [update, setUpdate] = useState(new Date().getSeconds())
    const { activeItem } = useSelector(state => state)

    useEffect(() => {
        console.log('MainTable: render')
        if (activeItem) {
            setTimeout(() => {
                if(update !== new Date().getSeconds()) setUpdate(new Date().getSeconds())
              }, 30000);
        }
      }, [activeItem, update])

    return (
        <div className='main-table'>
            <MainTableHeader content={ content } />
            {
                content === 'day'
                    ? <>
                        <MainTableDays />
                        <hr className='demiliter' />
                        <MainTableItems />
                    </>
                    : <TableWeek />
            }
            <TableTotal content={ content } />
        </div>
    )
}

export default MainTable