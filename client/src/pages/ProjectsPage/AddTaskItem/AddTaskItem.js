import React from 'react'
import './AddTaskItem.css'

const AddTaskItem = ({ isAddTask, setIsAddTask, taskName, setTaskName, addTask, plusLogo, xLogo }) => {

    
    const closeTaskInput = () => {
        setIsAddTask(false)
        setTaskName('')
    }

    return (
        <li className='task-item' >
        {
            isAddTask
                ? <input
                    className='add-task text'
                    value={ taskName }
                    placeholder='Название задачи...'
                    onChange={ (e) => setTaskName(e.target.value) }
                    onKeyDown={ addTask }
                    onBlur={ addTask }
                    autoFocus
                />
                : null
        }
        <button onClick={
            isAddTask
                ? closeTaskInput
                : (e) => setIsAddTask(!isAddTask)
        }>
            <img
                src={ isAddTask ? xLogo : plusLogo }
                alt= { isAddTask ? 'X' : 'Add' }
            />
        </button>
    </li>
    )

}

export default AddTaskItem