import React from 'react'
import './TaskItem.css'

const TaskItem = ({ isAddTask, setIsAddTask, taskName, setTaskName, addTask, plusLogo, xLogo }) => {

    
    const closeTaskInput = () => {
        setIsAddTask(false)
        setTaskName('')
    }

    return (
        <li className='task-item' key={ task._id }>
            <p className={ (isEdit === project._id) ? 'text' : 'text mar-r' } > { task.name } </p>
            {
                (isEdit === project._id)
                    ? <button onClick={ () => deleteExistingTask(task._id) } >
                        <img
                            src={images.xLogo}
                            alt='X'
                        />
                    </button>
                    : null
            }
        </li>
    )

}

export default TaskItem