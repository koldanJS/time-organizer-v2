import React from 'react'
import images from '../../../../../components/img/img'
import { getFormatTime } from '../../../../../functions'
import './DayItem.css'

const DayItem = ({isActive, isTimeOn, day, totalTime, clickHandler}) => {

    const classList = ['day-item']
    if (isActive) classList.push('active')
    if (isTimeOn) classList.push('time-on')

    const getImage = () => {
        if (isTimeOn) return <img src={images.clockLogo} alt='Clock' />
        return null
    }

    return (
        <a href='#' onClick={clickHandler} className={classList.join(' ')}>
            <p className='text width-700' >{ day }</p>
            <div className='day-time' >
                <p className='text inline-text' >{ getFormatTime(totalTime) }</p>
                { getImage() }
            </div>
        </a>
    )
}

export default DayItem