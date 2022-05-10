import React from 'react'
import MainTableHeader from './MainTableHeader/MainTableHeader'
import MainTableDays from './MainTableDays/MainTableDays'
import MainTableItems from './MainTableItems/MainTableItems'
import TableTotal from './TableTotal/TableTotal'
import EditTaskForm from '../../../components/UI/EditTaskForm/EditTaskForm'
import TableWeek from './TableWeek/TableWeek'
import './MainTable.css'

const MainTable = ({ content }) => {

    const { isEditFormOn, dispatch } = {} //useSimpledStore()

    const closeEditFormHandler = () => {
        // dispatch(offEditForm())
    }

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
            {
                isEditFormOn
                    ? <EditTaskForm closeFormHandler={closeEditFormHandler} index={isEditFormOn.index} />
                    : null
            }
        </div>
    )
}

export default MainTable