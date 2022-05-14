import React from 'react'
import Loader from '../Loader/Loader'
import './EmptyItem.css'

const EmptyItem = ({ isLoading = false, text = 'Добавляйте новые задачи и они появятся здесь!' }) => {



    return (
        <div className='empty-item'>
            {
                isLoading
                    ? <Loader />
                    : <p className='text size-22'>{ text }</p>
            }
        </div>
    )
}

export default EmptyItem