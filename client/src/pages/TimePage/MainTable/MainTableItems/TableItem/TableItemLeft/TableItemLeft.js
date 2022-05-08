import React from 'react'
import './TableItemLeft.css'

const TableItemLeft = ({projectName, taskName, description}) => {
    
    

    return (
        <div className='table-item-left'>
            <div className='basic' >
                <p className='text width-700' >{projectName}</p>
                <p className='text' >{taskName}</p>
            </div>
            <p className='text' >{description}</p>
        </div>
    )
}

export default TableItemLeft