import React from 'react'
import images from '../../img/img'
import './NewEntryBtn.css'

const NewEntryBtn = ({clickHandler}) => {



    return (
        <button className='new-entry-btn' onClick={clickHandler} >
            <img src={images.addLogo} alt='new-entry' />
            <p className='text size-16 color-white'>Новая запись</p>
        </button>
    )
}

export default NewEntryBtn