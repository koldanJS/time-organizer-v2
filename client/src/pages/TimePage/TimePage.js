import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Tabs from './Tabs/Tabs'
import NewEntry from './NewEntry/NewEntry'
import MainTable from './MainTable/MainTable'
import Archive from './Archive/Archive'



const TimePage = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const getContent = () => {
        if (location.pathname.includes('week')) return (
            <MainTable content='week' />
        )
        if (location.pathname.includes('archive')) return (
            <Archive />
        )
        return (
            <>
                <NewEntry />
                <MainTable content='day' />
            </>
        )
    }

    useEffect(() => {
        if (location.pathname === '/time') navigate('/time/current/day')
    })

    return (
        <main>
            <div className='container'>
                <Tabs />
            </div>
            <hr className='demiliter'/>
            <div className='container'>
                { getContent() }
            </div>
        </main>
    )
}

export default TimePage