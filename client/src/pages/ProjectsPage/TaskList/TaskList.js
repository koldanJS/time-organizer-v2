import React from 'react'
import TaskItem from '../TaskItem/TaskItem'
import AddTaskItem from '../AddTaskItem/AddTaskItem'
import './TaskList.css'

const TaskList = ({
    xLogo,
    isEdit = true,
    newTasks,
    showingTasks = [],
    deleteExistingTask,
    deleteNewTask,
    addTaskItemProps
}) => {

    return (
        <ul className='task-list'>
            {
                showingTasks.map( task => {
                    return (
                        < TaskItem
                            key={ task._id }
                            taskName={ task.name }
                            taskId={ task._id }
                            xLogo={ xLogo }
                            isEdit={ isEdit }
                            deleteHandler={ deleteExistingTask }
                        />
                    )
                } )
            }
            {
                newTasks.map( (task, index) => {
                    return (
                        < TaskItem
                            key={ index }
                            taskName={ task.name }
                            index={ index }
                            xLogo={ xLogo }
                            isEdit={ isEdit }
                            deleteHandler={ deleteNewTask }
                        />
                    )
                } )
            }
            {
                isEdit
                    ? <AddTaskItem {...addTaskItemProps} xLogo={ xLogo } />
                    : null
            }
        </ul>
    )

}

export default TaskList