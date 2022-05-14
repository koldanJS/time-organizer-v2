import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../../hooks/useFetchData'
import { useMessage } from '../../../../hooks/useMessage'
import { getAdditionTime, getDateString, getDayNumber, getFormatTime, getRange, getTotalTime } from '../../../../functions'
import Button from '../../../../components/UI/Button/Button'
import './TableTotal.css'

const TableTotal = ({ content }) => {

    const { createArchive } = useFetchData()
    const { setMessageState } = useMessage()

    const { offset, selectedDate, selectedWeek } = useSelector(state => state.app)
    const { timesSheet, archive, activeItem } = useSelector(state => state)

    const location = useLocation()
    let path = location.pathname.replace('/time/current/week', '')
    path = path.replace('/', '')    // Если после week что-то было, осталась косая черта

    const calcTotalTime = () => {
        let totalTime = 0
        let activeDateString = ''
        if (activeItem) activeDateString = getDateString(0, activeItem.startTime)
        if (timesSheet) totalTime = getFormatTime(getTotalTime(timesSheet.days[getDayNumber(offset)]))
        if (  // Если пользователь забыл выключить запись в другом дне
            timesSheet &&
            activeDateString === selectedDate.dateString    // Дни совпадают
        ) totalTime = getFormatTime(getTotalTime(timesSheet.days[getDayNumber(offset)]) + getAdditionTime(activeItem))
        return totalTime
    }

    const createArchiveHandler = async () => {
        const dateString = selectedWeek[0]
        const weekRange = getRange(offset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
        const offsetRange = [weekRange[0] + offset, weekRange[1] + offset]  //Диапазон смещений для [Пн, Вс] относительно сегодня
        if (activeItem) { //Если активная запись входит в архивируемую неделю
            const activeDateString = getDateString(0, activeItem.startTime)
            if (selectedWeek.includes(activeDateString)) return setMessageState('У вас еще есть активные задачи!', 'error', 'main-table-page')
        }
        const itemsLength = timesSheet.days.reduce((totalLength, day) => {  // Находим количество записей в неделе
            return totalLength += day.items.length
        }, 0)
        if (!itemsLength) { //Если записей нет
            return setMessageState('В этой неделе нечего архивировать!', 'error', 'main-table-page')
        }
        setMessageState('Отчет добавлен в архив!', 'success', 'main-table-page')
        try {
            await createArchive(dateString, `createArchive: ${dateString}`)

        } catch(e) {
            console.log(e.message)
        }
    }

    const getWeekTime = () => {
        let { objTimes } = timesSheet?.week || {}   // Получили данные для отображения недельного формата
        if (path) {  //Если есть путь после week, значит отобразить соответствующую запись из архива
            const archiveItem = archive.find(item => item.date === path)
            objTimes = archiveItem.week.objTimes
        }
        if (!objTimes) objTimes = {}
        return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'totalTime'].map((title, index) => {
            return <li key={ index } >
                <p className='text size-20 width-700' >{ getFormatTime(objTimes[title] || 0) }</p>
            </li>
        })
    }

    return (
        <div className='table-total'>
            {
                content === 'day'
                    ? <>
                        <div className='total' >
                            <p className='text size-20 width-700' >Итого:</p>
                            <p className='text size-20 width-700' >{ calcTotalTime() }</p>
                        </div>
                        <div className='submit-week' >
                            <Button clickHandler={ createArchiveHandler } >
                                <p className='text' >Архивировать недельный отчет</p>
                            </Button>
                        </div>
                    </>
                    : <ul className='week-total' >
                        <li>
                            <p className='text size-20 width-700' >Итого:</p>
                        </li>
                        { getWeekTime() }
                    </ul>
            }
        </div>
    )
}

export default TableTotal