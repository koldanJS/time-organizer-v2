import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setOffset } from '../../../../redux/actions/appActions'
import { getDate, getFormatTime, getOffset, getRange } from '../../../../functions'
import EmptyItem from '../../../../components/EmptyItem/EmptyItem'
import './TableWeek.css'

const TableWeek = ({ isLoading }) => {

    const dispatch = useDispatch()
    const { offset } = useSelector(state => state.app)
    const { timesSheet, archive } = useSelector(state => state)
    const location = useLocation()
    let path = location.pathname.replace('/time/current/week', '')
    path = path.replace('/', '')    // Если после week что-то было, осталась косая черта

    useEffect(() => {
        if (path) {  //Если есть путь после week, установить offset выбранной недели
            const currentOffset = getOffset(path)
            dispatch(setOffset(currentOffset))
        }
    }, [path])

    const getEntry = () => {
        if (isLoading) return <li className='week-table-item'>
            <EmptyItem isLoading={true} />
        </li>
        let { objItems } = timesSheet?.week || {}   // Получили данные для отображения недельного формата
        if (path) {  //Если есть путь после week, значит отобразить соответствующую запись из архива
            const archiveItem = archive.find(item => item.date === path)
            objItems = archiveItem.week.objItems
        }
        if (!objItems || !Object.keys(objItems).length) return ( // Если длина массива записей 0
            <li className='week-table-item'>
                <EmptyItem text='Записи отсутствуют' />
            </li>
        )
        return Object.keys(objItems).map((stringName, index) => {
            return (
                <li className='week-table-item' key={ index } >
                    <ul className='days'>
                        <li className='name'>
                            <p className='text width-700' >{ stringName.split('____')[0] }</p>
                            <p className='text' >{ stringName.split('____')[1] }</p>
                        </li>
                        {
                            ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ].map(dayString => {
                                return <li className='text' key={ dayString }>
                                    { getFormatTime(objItems[stringName][dayString] || 0) }
                                </li>
                            })
                        }
                        <li className='text width-700'>
                            { getFormatTime(objItems[stringName].totalTime || 0) }
                        </li>
                    </ul>
                    <hr className='demiliter' />
                </li>
            )
        })
    }

    const getDays = () => {
        const weekRange = getRange(offset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
        const offsetRange = [weekRange[0] + offset, weekRange[1] + offset]  //Диапазон смещений для [Пн, Вс] относительно сегодня

        let arrDays = []
        for (let i = offsetRange[0]; i <= offsetRange[1]; i++) {
            arrDays.push(getDate(i))
        }

        return arrDays.map(date => {
            return (
                <li key={ date.dayShort } >
                    <p>{ date.dayShort + ',' }</p>
                    <p>{ date.dayOfMonth + ' ' + date.monthDayShort }</p>
                </li>
            )
        })
    }

    return (
        <div className='week-table'>
            <h1 className='text size-30 width-700 header' >Недельный отчет</h1>
            <ul className='text head-item days'>
                <li className='name'>Проект / Задача</li>
                { getDays() }
                <li >
                    <p className='text width-700' >Итого</p>
                </li>
            </ul>
            <ul>
                { getEntry() }
            </ul>
        </div>
    )
}

export default TableWeek