import React from 'react'
import { useMessage } from '../../../../hooks/useMessage'
import TableHeaderLeft from './TableHeaderLeft/TableHeaderLeft'
import TableHeaderRight from './TableHeaderRight/TableHeaderRight'
import './MainTableHeader.css'

const MainTableHeader = ({ content }) => {

    const { message, showMessage } = useMessage()

    return (
        <div className='main-table-header' >
            <TableHeaderLeft content={ content } />
            {
                message
                    ? showMessage()
                    : null
            }
            <TableHeaderRight content={ content } />
        </div>
    )
}

export default MainTableHeader