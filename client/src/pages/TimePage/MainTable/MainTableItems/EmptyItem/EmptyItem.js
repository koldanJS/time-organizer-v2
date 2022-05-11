import React from 'react'
import Loader from '../../../../../components/Loader/Loader'
import './EmptyItem.css'

const EmptyItem = ({isLoading = false}) => {



    return (
        <div className='empty-item'>
            {
                isLoading
                    ? <Loader />
                    : <p className='text size-22'>Добавляйте новые задачи и они появятся здесь!</p>
            }
        </div>
    )
}

export default EmptyItem