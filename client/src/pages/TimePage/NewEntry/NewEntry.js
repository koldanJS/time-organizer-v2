import React, { useState } from 'react'
import TaskForm from '../../../components/UI/TaskForm/TaskForm'
import ButtonForm from '../../../components/UI/ButtonForm/ButtonForm'
import images from '../../../components/img/img'
import './NewEntry.css'

const NewEntry = () => {

    const [isTaskForm, setIsTaskForm] = useState(false)

    return (
        <div className='new-entry' >
            <ButtonForm classType='success new-entry-btn' clickHandler={ () => setIsTaskForm(!isTaskForm) } >
                <img src={images.addLogo} alt='new-entry' />
                <p className='text size-16 color-white'>Новая запись</p>
            </ButtonForm>
            {
                isTaskForm
                    ? <TaskForm closeFormHandler={ () => setIsTaskForm(false) } typeForm='add' />
                    : null
            }
        </div>
    )
}

export default NewEntry