import React from 'react'
import TableItemLeft from './TableItemLeft/TableItemLeft'
import TableItemRight from './TableItemRight/TableItemRight'
import './TableItem.css'

const TableItem = ({projectName, taskName, description, totalTime, isActive, index}) => {

    const classList = ['table-item']
    if (isActive) classList.push('active')


    const left = {
        projectName,
        taskName,
        description
    }
    const right = {
        totalTime,
        isActive,
        index
    }

    return (
        <div className={classList.join(' ')}>
            <TableItemLeft {...left} />
            <TableItemRight {...right} />
        </div>
    )
}

export default TableItem