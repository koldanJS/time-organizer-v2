import React, { useState } from 'react'
import AddTaskForm from '../../../components/UI/AddTaskForm/AddTaskForm'
import ButtonForm from '../../../components/UI/ButtonForm/ButtonForm'
import images from '../../../components/img/img'
import './NewEntry.css'

const NewEntry = () => {

    const [isAddFormOn, setIsAddFormOn] = useState(false)

    const clickHandler = () => {
        console.log('add task')
        // setIsAddFormOn(!isAddFormOn)
    }

    const closeFormHandler = () => {
        setIsAddFormOn(false)
    }

    return (
        <div className='new-entry' >
            <ButtonForm classType='success new-entry-btn' clickHandler={ clickHandler } >
                <img src={images.addLogo} alt='new-entry' />
                <p className='text size-16 color-white'>Новая запись</p>
            </ButtonForm>
            {
                isAddFormOn
                    ? <AddTaskForm closeFormHandler={ closeFormHandler } />
                    : null
            }
        </div>
    )
}

export default NewEntry