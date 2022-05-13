import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../../hooks/useFetchData'
import { getAdditionTime, getDayNumber, getFormatTime, getRange, getTotalTime } from '../../../../functions'
import Button from '../../../../components/UI/Button/Button'
import './TableTotal.css'

const TableTotal = ({ content }) => {

    const { createArchive } = useFetchData()

    const { offset, selectedWeek } = useSelector(state => state.app)
    const { timesSheet, activeItem } = useSelector(state => state)

    let time = 0
    if (timesSheet) time = getFormatTime(getTotalTime(timesSheet.days[getDayNumber(offset)]) + getAdditionTime(activeItem))

    const createArchiveHandler = async () => {
        const dateString = selectedWeek[0]
        const weekRange = getRange(offset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
        const offsetRange = [weekRange[0] + offset, weekRange[1] + offset]  //Диапазон смещений для [Пн, Вс] относительно сегодня
        if (activeItem && ((offsetRange[0] <= 0) && (offsetRange[1] >= 0))) { //Если активная запись входит в архивируемую неделю
            return alert('У вас еще есть активные задачи')
        }
        const itemsLength = timesSheet.days.reduce((totalLength, day) => {  // Находим количество записей в неделе
            return totalLength += day.items.length
        }, 0)
        if (!itemsLength) { //Если записей нет
            return alert('В этой неделе нечего архивировать')
        }
        try {
            await createArchive(dateString, `createArchive: ${dateString}`)
        } catch(e) {
            console.log(e.message)
        }
    }

    return (
        <div className='table-total'>
            {
                content === 'day'
                    ? <div className='total' >
                        <p className='text size-20 width-700' >Итого:</p>
                        <p className='text size-20 width-700' >{ time }</p>
                    </div>
                    : null
            }
            <div className='submit-week' >
                {
                    content === 'day'
                        ? <Button clickHandler={ createArchiveHandler } >
                            <p className='text' >Архивировать недельный отчет</p>
                        </Button>
                        : null
                }
            </div>
        </div>
    )
}

export default TableTotal