import React from 'react'
import './TasksList.css'

const TasksList = ({ isEdit }) => {

    const getTasks = () => {
        return (
            
            .concat(
                
            )
                
        )
    }

    const newGetTasks = () => {
        return (
            newTasks.map( (task, index) => {
                return (
                    <li className='task-item' key={ index }>
                        <p className='text' > { task.name } </p>
                        <button onClick={ () => deleteTask(index) } >
                            <img
                                src={images.xLogo}
                                alt='X'
                            />
                        </button>
                    </li>
                )
            } )
        )
    }

    const taskItemProps = {
        isAddTask,
        setIsAddTask,
        taskName,
        setTaskName,
        addTask,
        plusLogo: images.plusLogo,
        xLogo: images.xLogo
    }

    return (
        <ul className='tasks-list'>
            {
                showingTasks.map( task => {
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
                } )
            }
            {
                newTasks.map( (task, index) => {
                    return (
                        <li className='task-item' key={ index }>
                            <p className='text' > { task.name } </p>
                            <button onClick={ () => deleteNewTask(index) } >
                                <img
                                    src={images.xLogo}
                                    alt='X'
                                />
                            </button>
                        </li>
                    )
                } )
            }
            {
                (isEdit === project._id)
                    ? <TaskItem {...taskItemProps} />
                    : null
            }
        </ul>
    )

}

export default TasksList