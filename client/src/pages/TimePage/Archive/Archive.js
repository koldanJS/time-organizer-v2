import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { getDatePeriod } from '../../../functions'
import './Archive.css'

const Archive = () => {

    const { deleteArchive } = useFetchData()

    const navigate = useNavigate()
    const { archive } = useSelector(state => state)

    const deleteHandler = async (id) => {
        await deleteArchive(id, 'Archive: delete archive')
    }

    const getItems = () => {
        if (!archive.length) return <li className='archive-item'>
            <p className='text'>Архивированных отчетов нет</p>
        </li>
        return archive.map((timesSheet, index) => {
            return (
                <li className='archive-item' key={ timesSheet.date + index } >
                    <div className='buttons'>
                        <button className='text' onClick={ () => navigate('/time/current/week/' + timesSheet.date) } >
                            { getDatePeriod(timesSheet.date) }
                        </button>
                        <button className='text' onClick={ () => deleteHandler(timesSheet._id) } >
                            Удалить
                        </button>
                    </div>
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