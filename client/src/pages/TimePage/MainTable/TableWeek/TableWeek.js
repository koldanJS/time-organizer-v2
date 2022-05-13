import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getDate, getRange } from '../../../../functions'
import './TableWeek.css'

const TableWeek = () => {

    const { offset } = useSelector(state => state.app)
    const location = useLocation()
    let path = location.pathname.replace('/time/current/week', '')
    if (path) path = path.replace('/', '')

    // useEffect(() => {
    //     if (path) {  //Если есть путь после week
    //         const dayStartString = path.split('_')[0] //Получили строку первого дня выбранной недели
    //         const currentOffset = getOffset(dayStartString)
    //         dispatch(setOffset(currentOffset))
    //     }
    // }, [path])

    const getTable = () => {
        // const selectedWeek = getSelectedWeek(offset)

        // const tableItems = {}
        // const timesSheets = user.timesSheets
        // const currentTimesSheets = {}
        // selectedWeek.forEach(dateString => {   //Получаем все временные таблицы архивируемой недели
        //     if (timesSheets[dateString]) {
        //         currentTimesSheets[dateString] = timesSheets[dateString]
        //     }
        // })

        // Object.keys(currentTimesSheets).forEach(dateString => {
        //     const arrItems = currentTimesSheets[dateString]
        //     for (const item of arrItems) {
        //         const key = item.projectId + item.taskId
        //         const newItem = {...tableItems[key]}
        //         newItem.projectName = projects[item.projectId].projectName
        //         newItem.taskName = tasks[item.taskId].taskName
        //         newItem[dateString] = (newItem[dateString] || 0) + item.totalTime
        //         tableItems[key] = {...tableItems[key], ...newItem}
        //     }
        // })

        // let arrOfTableItems = Object.values(tableItems)
        // console.log('arrOfTableItems', arrOfTableItems)

        // return arrOfTableItems
    }

    const getEntry = () => {
        // if (path) {  //Если есть путь после week, значит отобразить соответствующую запись из архива
        //     const archive = user.archive[path]
        //     const selectedWeek = getSelectedWeek(offset)
        //     return archive.map((entry, index) => {
        //         return (
        //             <li className='week-table-item' key={ index } >
        //                 <ul className='days'>
        //                     <li className='name'>
        //                         <p className='text width-700' >{ entry.projectName }</p>
        //                         <p className='text' >{ entry.taskName }</p>
        //                     </li>
        //                     {
        //                         selectedWeek.map((timeString, index) => {
        //                             if (timeString === null) return
        //                             return <li className='text' key={ timeString }>
        //                                 { entry[selectedWeek[index]] || 0 }
        //                             </li>
        //                         })
        //                     }
        //                 </ul>
        //                 <hr className='demiliter' />
        //             </li>
        //         )
        //     })
        // }
        // const arrOfTableItems = getTable()
        // if (arrOfTableItems.length === 0) return (
        //     <li className='week-table-item'>
        //         <p className='text empty-item' >Записи отсутствуют</p>
        //     </li>
        // )
        // const selectedWeek = getSelectedWeek(offset)
        //     return arrOfTableItems.map((entry, index) => {
        //         return (
        //             <li className='week-table-item' key={ index } >
        //                 <ul className='days'>
        //                     <li className='name'>
        //                         <p className='text width-700' >{ entry.projectName }</p>
        //                         <p className='text' >{ entry.taskName }</p>
        //                     </li>
        //                     {
        //                         selectedWeek.map((timeString, index) => {
        //                             if (timeString === null) return
        //                             return <li className='text' key={ timeString }>
        //                                 { entry[selectedWeek[index]] || 0 }
        //                             </li>
        //                         })
        //                     }
        //                 </ul>
        //                 <hr className='demiliter' />
        //             </li>
        //         )
        //     })
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
            </ul>
            <ul>
                { getEntry() }
            </ul>
        </div>
    )
}

export default TableWeek