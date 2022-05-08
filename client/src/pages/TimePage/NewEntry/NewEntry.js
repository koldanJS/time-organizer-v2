import React from 'react'
// import { useSimpledStore } from '../../../../functions/functions'
// import { onAddForm } from '../../../../redux/actions/appStateActions/appStateActions'
import NewEntryBtn from '../../../UI/NewEntryBtn/NewEntryBtn'

const NewEntry = () => {

    // const { dispatch } = useSimpledStore()

    const clickHandler = () => {
        console.log('addTask')
        // dispatch(onAddForm())
    }

    return (
        <div className='new-entry' >
            <NewEntryBtn clickHandler={clickHandler} />
        </div>
    )
}

export default NewEntry