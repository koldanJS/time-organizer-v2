import React from 'react'
import './TaskItem.css'

const TaskItem = ({ taskName, taskId = null, index, xLogo, isEdit = true, deleteHandler }) => {



    return (
        <li className='task-item'>
            <p className={ isEdit ? 'text' : 'text mar-r' } >
                { taskName }
            </p>
            {
                isEdit
                    ? <button onClick={
                        taskId
                            ? () => deleteHandler(taskId)
                            : () => deleteHandler(index)
                    } >
                        <img src={ xLogo } alt='X' />
                    </button>
                    : null
            }
        </li>
    )

}

export default TaskItem