import React from 'react'
import './DayTotal.css'

const DayTotal = ({totalTime}) => {



    return (
        <div className='day-total' >
            <p className='text width-700' >Итого за неделю</p>
            <p className='text inline-text' >{totalTime}</p>
        </div>
    )
}

export default DayTotal