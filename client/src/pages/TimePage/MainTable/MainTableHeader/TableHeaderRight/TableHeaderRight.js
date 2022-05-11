import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDateString, msPerDay } from '../../../../../functions'
import { setOffset } from '../../../../../redux/actions/appActions'
import LeftRightBtn from '../../../../../components/UI/LeftRightBtn/LeftRightBtn'
import './TableHeaderRight.css'

const TableHeaderRight = ({ content }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeCalendarHandler = (event) => {
        console.log('calendar', event.target.value)
        const now = new Date(getDateString(0)) //милисекунды на сегодня в 00:00
        const selectedDate = new Date(event.target.value) //милисекунды на выбранный день в 00:00
        const newOffset = Math.round((selectedDate - now)/msPerDay) //Смещение в днях
        console.log('newOffset', newOffset)
        dispatch(setOffset(newOffset))
    }

    const clickHandler = (tag) => {
        if (tag === 'week') {
            navigate('/time/current/week')
            console.log('week')
        } else {
            navigate('/time/current/day')
            console.log('day')
        }
    }

    let classListLeft = 'text btn-left day'
    let classListRight = 'text btn-right week'
    if (content === 'day') classListLeft += ' active'
    if (content === 'week') classListRight += ' active'

    return (
        <div className='table-header-right' >
            <input type='date' onChange={ changeCalendarHandler } />
            <div className='left-right-btn day-week' >
                <LeftRightBtn
                    classList={ classListLeft }
                    clickHandler={ () => clickHandler('day') }
                >
                    День
                </LeftRightBtn>
                <LeftRightBtn
                    classList={ classListRight }
                    clickHandler={ () => clickHandler('week') }
                >
                    Неделя
                </LeftRightBtn>
            </div>
        </div>
    )
}

export default TableHeaderRight