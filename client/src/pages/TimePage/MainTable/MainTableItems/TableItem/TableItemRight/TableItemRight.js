import React from 'react'
import Button from '../../../../../../components/UI/Button/Button'
import Animate from '../../../../../../components/UI/Button/Animate/Animate'
import images from '../../../../../../components/img/img'
// import { changeActiveEntry, getDateString, getFormatTime, stopTracking, useSimpledStore, useUpdate } from '../../../../../../../functions/functions'
// import axiosHandler from '../../../../../../../axios/axiosHandler'
// import { onEditForm } from '../../../../../../../redux/actions/appStateActions/appStateActions'
import './TableItemRight.css'

const TableItemRight = ({totalTime, isActive, index}) => {

    const { user, userId, offset, dispatch } = {} //useSimpledStore()
    // const { getUpdate } = useUpdate()

    const stop = () => {
        // stopTracking( user, userId, axiosHandler, getUpdate )
        // console.log('STOP')
    }

    const start = async () => {
        // if (offset) return
        // if (user.activeEntry) await stopTracking( user, userId, axiosHandler, getUpdate )    //Записывает в totalTime окончательное время
        // await changeActiveEntry( offset, user, userId, getDateString, axiosHandler, getUpdate, index )  //Устанавливает данную запись активной, если offset === 0
        // console.log('START')
    }

    const edit = async (index) => {
        // if (!offset && user.activeEntry && index === user.activeEntry.entryNumber) {    //Проверка, что редактируем активную запись
        //     await stopTracking( user, userId, axiosHandler, getUpdate )  //Тогда остановить ее и обновить в ней данные
        // }
        // dispatch(onEditForm(index))
        // console.log('EDIT ', index)
    }

    return (
        <div className='table-item-right'>
            <p className='text size-20 width-700' >{ 'getFormatTime(totalTime)' }</p>
            {
                isActive
                    ? <Button
                        clickHandler={stop}
                        classType='start'
                    >
                        <Animate title='Стоп' />
                    </Button>
                    : <Button
                        clickHandler={start}
                        classType='start'
                    >
                        <img src={images.timerLogo} alt='Timer' />
                        <p className='text' >Старт</p>
                    </Button>
            }
            <Button
                clickHandler={() => edit(index)}
                classType='edit'
                >
                <p className='text' >Изменить</p>
            </Button>
        </div>
    )
}

export default TableItemRight