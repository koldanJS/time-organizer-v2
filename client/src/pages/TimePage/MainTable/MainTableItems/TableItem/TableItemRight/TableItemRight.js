import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchData } from '../../../../../../hooks/useFetchData'
import { getFormatTime } from '../../../../../../functions'
import TaskForm from '../../../../../../components/UI/TaskForm/TaskForm'
import Button from '../../../../../../components/UI/Button/Button'
import Animate from '../../../../../../components/UI/Button/Animate/Animate'
import images from '../../../../../../components/img/img'
import './TableItemRight.css'

const TableItemRight = ({totalTime, isActive, index}) => {

    const { startTracking, stopTracking } = useFetchData()
    const { activeItem } = useSelector(state => state)
    const { offset } = useSelector(state => state.app)
    const [isTaskForm, setIsTaskForm] = useState(false)

    const editHandler = async (index) => {
        if (!offset && activeItem?.itemIndex === index) {   //Если запись редактируем сегодня, проверка, что редактируем активную запись
            await stopTracking('editTaskItem (edit): stopTracking') // Тогда останавливаем ее
        }
        setIsTaskForm(true)
    }

    const stopHandler = async () => {
        await stopTracking('editTaskItem (stop): stopTracking') // Тогда останавливаем ее
    }

    const startHandler = async () => {
        if (offset) return
        if (activeItem) await stopTracking('editTaskItem (start - stop other): stopTracking') // Тогда останавливаем ее
        await startTracking(index, 'editTaskItem (start): startTracking')  //Устанавливает данную запись активной, если offset === 0
    }



    return (
        <div className='table-item-right'>
            <p className='text size-20 width-700' >{ getFormatTime(totalTime) }</p>
            {
                isActive
                    ? <Button
                        clickHandler={ stopHandler }
                        classType='start'
                    >
                        <Animate title='Стоп' />
                    </Button>
                    : <Button
                        clickHandler={ startHandler }
                        classType='start'
                    >
                        <img src={ images.timerLogo } alt='Timer' />
                        <p className='text' >Старт</p>
                    </Button>
            }
            <Button
                clickHandler={ () => editHandler(index) }
                classType='edit'
                >
                <p className='text' >Изменить</p>
            </Button>
            {
                isTaskForm
                    ? <TaskForm
                        closeFormHandler={ () => setIsTaskForm(false) }
                        typeForm='edit'
                        index={ index }
                    />
                    : null
            }
        </div>
    )
}

export default TableItemRight