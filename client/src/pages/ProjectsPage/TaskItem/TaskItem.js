import React from 'react'

const TaskItem = ({ isAddTask, setIsAddTask, taskName, setTaskName, addTask, plusLogo, xLogo }) => {

    
    const closeTaskInput = () => {
        setIsAddTask(false)
        setTaskName('')
    }

    return (
        <li className='task-item' >
        {
            isAddTask
                ? <>
                    <input
                        className='add-task text'
                        value={ taskName }
                        placeholder='Название задачи...'
                        onChange={ (e) => setTaskName(e.target.value) }
                        onKeyDown={ addTask }
                        onBlur={ addTask }
                        autoFocus
                    />
                    <button onClick={ closeTaskInput } >
                        <img
                            src={ xLogo }
                            alt='X'
                        />
                    </button>
                </>
                : <button
                    onClick={ (e) => setIsAddTask(!isAddTask) }
                >
                    <img
                        src={ plusLogo }
                        alt='Add'
                    />
                </button>
        }
    </li>
    )

}

export default TaskItem