import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { getDateString, msPerDay, useSimpledStore } from '../../../../../../functions/functions'
// import { setOffset } from '../../../../../../redux/actions/appStateActions/timeStateActions'
import LeftRightBtn from '../../../../../components/UI/LeftRightBtn/LeftRightBtn'
import './TableHeaderRight.css'

const TableHeaderRight = ({ content }) => {

    // const { dispatch } = useSimpledStore()
    const navigate = useNavigate()

    const changeHandler = (event) => {
        // const now = new Date(getDateString()) //милисекунды на сегодня в 00:00
        // const selectedDate = new Date(event.target.value) //милисекунды на выбранный день в 00:00
        // const newOffset = Math.round((selectedDate - now)/msPerDay) //Смещение в днях
        // dispatch(setOffset(newOffset))
    }

    const clickHandler = (direction) => {
        // if (direction > 0) {
        //     navigate('/time/current/week')
        //     console.log('week')
        // } else {
        //     navigate('/time/current/day')
        //     console.log('day')
        // }
    }

    let classListLeft = 'text btn-left day'
    let classListRight = 'text btn-right week'
    if (content === 'day') classListLeft += ' active'
    if (content === 'week') classListRight += ' active'

    return (
        <div className='table-header-right' >
            <input type='date' onChange={ changeHandler } />
            <div className='left-right-btn day-week' >
                <LeftRightBtn
                    classList={ classListLeft }
                    clickHandler={ () => clickHandler(-1) }
                >
                    День
                </LeftRightBtn>
                <LeftRightBtn
                    classList={ classListRight }
                    clickHandler={ () => clickHandler(1) }
                >
                    Неделя
                </LeftRightBtn>
            </div>
        </div>
    )
}

export default TableHeaderRight