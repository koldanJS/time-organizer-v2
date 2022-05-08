import React from 'react'
import Loader from '../../../../../components/Loader/Loader'
import './EmptyItem.css'

const EmptyItem = ({isLoading = false}) => {

    const getContent = () => {
        if (isLoading) return (
            <>
                <Loader />
                <p className='loading'>LOADING...</p>
            </>
        )
        return <p className='text size-22'>Добавляйте новые задачи и они появятся здесь!</p>
    }

    return (
        <div className='empty-item'>
            {getContent()}
        </div>
    )
}

export default EmptyItem