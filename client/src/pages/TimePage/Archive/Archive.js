import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDatePeriod } from '../../../functions'
import './Archive.css'

const Archive = () => {

    const navigate = useNavigate()
    const { archive } = useSelector(state => state)

    const getItems = () => {
        if (!archive.length) return <li className='archive-item'>
            <p className='text'>Архивированных отчетов нет</p>
        </li>
        return archive.map(timesSheet => {
            return (
                <li className='archive-item' key={ timesSheet.date } >
                    <button className='text' onClick={ () => navigate('/time/current/week/' + timesSheet.date) } >
                        { getDatePeriod(timesSheet.date) }
                    </button>
                    <hr className='demiliter' />
                </li>
            )
        })
    }

    return (
        <div className='archive'>
            <h1 className='text size-30 width-700 header' >Архив недельных отчетов</h1>
            <h2 className='text head-item' >Временной промежуток</h2>
            <ul>
                { getItems() }
            </ul>
        </div>
    )
}

export default Archive