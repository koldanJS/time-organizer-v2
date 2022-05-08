import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { getDatePeriod, useSimpledStore } from '../../../../functions/functions'
import './Archive.css'

const Archive = () => {

    const navigate = useNavigate()
    const { user } = {} //useSimpledStore()

    const getItems = () => {
        if (!user.archive) return <li>Архивированных отчетов нет</li>
        return Object.keys(user.archive).map(keyItem => {
            const dayStartString = keyItem.split('_')[0]
            return (
                <li className='archive-item' key={ keyItem } >
                    <button className='text' onClick={ () => navigate('/time/current/week/' + keyItem) } >
                        { 'getDatePeriod(dayStartString)' }
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