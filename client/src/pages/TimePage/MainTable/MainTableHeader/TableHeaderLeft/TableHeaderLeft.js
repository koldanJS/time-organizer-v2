import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, getRange } from '../../../../../functions'
import { changeOffset, setOffset } from '../../../../../redux/actions/appActions'
import LeftRightBtn from '../../../../../components/UI/LeftRightBtn/LeftRightBtn'
import images from '../../../../../components/img/img'
import './TableHeaderLeft.css'

const TableHeaderLeft = ({ content }) => {

    const dispatch = useDispatch()
    const { offset, selectedDate } = useSelector(state => state.app)
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname.replace('/time/current/week', '')
    let stepOffset = (content === 'week') ? 7 : 1

    const clickHandler = (offset) => {
        if (path && content === 'week') navigate('/time/current/week')
        dispatch(changeOffset(offset))
    }

    const getContent = () => {
        const returnBtn = (
            <button
                className='text return-link'
                onClick={() => {
                    dispatch(setOffset(0))
                    if (path && content === 'week') navigate('/time/current/week')
                }}
            >
                { content === 'day' ? 'Вернуться к сегодня' : 'К текущей неделе'}
            </button>
        )

        if (content === 'day') {
            if (!offset) return (
                <>
                    <p className='text size-22 width-700' >Сегодня:</p>
                    <p className='text size-22' >
                        { `${selectedDate.day}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort}` }
                    </p>
                </>
            )
            return (
                <>
                    <p className='text size-22' >
                        { `${selectedDate.day}, ${selectedDate.dayOfMonth} ${selectedDate.monthDayShort}` }
                    </p>
                    { returnBtn }
                </>
            )
        } else {    // Доработать отображение недель
            const weekRange = getRange(offset)  //Диапазон смещений для [Пн, Вс] в выбранной неделе
            const offsetRange = [weekRange[0] + offset, weekRange[1] + offset]  //Диапазон смещений для [Пн, Вс] относительно сегодня

            const fromDate = getDate(offsetRange[0])
            const toDate = getDate(offsetRange[1])

            const fromString = `${fromDate.dayOfMonth} ${fromDate.monthDayShort} ${fromDate.year}`
            const toString = `${toDate.dayOfMonth} ${toDate.monthDayShort} ${toDate.year}`
            const datePeriod = fromString + ' - ' + toString

            if ((offsetRange[0] <= 0) && (offsetRange[1] >= 0)) return( //Если сегодня входит в выбранную неделю
                <>
                    <p className='text size-22 width-700' >Эта неделя:</p>
                    <p className='text size-22' >{ datePeriod }</p>
                </>
            )
            return (
                <>
                    <p className='text size-22' >{ datePeriod }</p>
                    { returnBtn }
                </>
            )
        }
    }

    return (
        <div className='table-header-left' >
            <div className='left-right-btn arrow' >
                <LeftRightBtn classList='btn-left arrow' clickHandler={ () => clickHandler(-stepOffset) } >
                    <img src={ images.arrowLeft } alt='Arrow' />
                </LeftRightBtn>
                <LeftRightBtn classList='btn-right arrow' clickHandler={ () => clickHandler(stepOffset) } >
                    <img src={ images.arrowRight } alt='Arrow' />
                </LeftRightBtn>
            </div>
            { getContent() }
        </div>
    )
}

export default TableHeaderLeft