import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMessage } from '../../hooks/useMessage'
import { getDateString, getOffset } from '../../functions'
import Tabs from './Tabs/Tabs'
import NewEntry from './NewEntry/NewEntry'
import MainTable from './MainTable/MainTable'
import Archive from './Archive/Archive'



const TimePage = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { activeItem } = useSelector(state => state)

    const { permanentMessage, setPermanentMessageState, showPermanentMessage } = useMessage()

    useEffect(() => {
        if (activeItem) {  // Если пользователь забыл выключить запись в другом дне
            const activeDateString = getDateString(0, activeItem.startTime)
            const activeOffset = getOffset(activeDateString)
            // Активная запись м.б. только сегодня, иначе нужно сообщить пользователю
            if (activeOffset === 0) {
                if (permanentMessage) setPermanentMessageState(null)
            }
            if (activeOffset !== 0) {
                if (!permanentMessage) setPermanentMessageState(`У вас есть активная запись ${activeDateString}!!!`, 'error', 'permanent')
            }
        }
    })

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
            <div className='permanent-message' >
                {
                    permanentMessage
                        ? showPermanentMessage()
                        : null
                }
            </div>
            <div className='container'>
                { getContent() }
            </div>
        </main>
    )
}

export default TimePage