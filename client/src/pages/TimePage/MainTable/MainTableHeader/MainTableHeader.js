import React from 'react'
import TableHeaderLeft from './TableHeaderLeft/TableHeaderLeft'
import TableHeaderRight from './TableHeaderRight/TableHeaderRight'
import './MainTableHeader.css'

const MainTableHeader = ({ content }) => {



    return (
        <div className='main-table-header' >
            <TableHeaderLeft content={ content } />
            <TableHeaderRight content={ content } />
        </div>
    )
}

export default MainTableHeader