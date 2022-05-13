import React, { useEffect } from 'react'
import { useMessage } from '../../../../hooks/useMessage'
import TableHeaderLeft from './TableHeaderLeft/TableHeaderLeft'
import TableHeaderRight from './TableHeaderRight/TableHeaderRight'
import './MainTableHeader.css'

const MainTableHeader = ({ content }) => {

    const { message, setMessage, showMessage } = useMessage()

    // useEffect(() => {
    //     setMessage({ message: 'message', type: 'success', pageClass: 'main-table-page' })
    // }, [])

    return (
        <div className='main-table-header' >
            <TableHeaderLeft content={ content } />
            {
                message
                    ? showMessage()
                    : null
            }
            <button onClick={() => setMessage({ message: 'message', type: 'success', pageClass: 'main-table-page' })} >X</button>
            <TableHeaderRight content={ content } />
        </div>
    )
}

export default MainTableHeader