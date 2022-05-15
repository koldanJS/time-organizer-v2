import React from 'react'
import './AddTaskItem.css'

const AddTaskItem = ({ isAddTask, setIsAddTask, taskName, setTaskName, addTask, plusLogo, xLogo }) => {

    
    const closeTaskInput = () => {
        setIsAddTask(false)
        setTaskName('')
    }

    return (
        <li
            className='task-item'
            onBlurCapture={ (e) => {
            if (e?.relatedTarget?.parentNode === e.target.parentNode) e.stopPropagation()
            } }
        >
        {
            isAddTask
                ? <input
                    className='add-task text'
                    value={ taskName }
                    placeholder='Название задачи...'
                    onChange={ (e) => setTaskName(e.target.value) }
                    onKeyDown={ addTask }
                    autoFocus
                    onBlur={ addTask }
                />
                : null
        }
        <button className='task-cancel' onClick={
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