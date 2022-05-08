import React, { useContext } from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
// import { useSimpledStore } from '../../../functions/functions'
// import { removeUser } from '../../../redux/actions/appStateActions/appStateActions'
import './DropDown.css'

const DropDown = ({ closeDropDown }) => {

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const { user } = useSimpledStore()
    // const name = (user.info.firstName || 'FirstName') + (user.info.lastName || '')
    // const company = user.info.company || 'Your Company?'

    const auth = useContext(AuthContext)

    return (
        <>
            <div className='blur' onClick={ closeDropDown } ></div>
            <div className='drop-down' >
                <div className='info' >
                    <p className='text size-22 width-700 name' >{ 'name' }</p>
                    <p className='text size-16 company' >{ 'company' }</p>
                </div>
                <div className='settings' >
                    <button onClick={ () => { navigate("/edit-user"); closeDropDown() } } >
                        <p className='text' >Мой профиль</p>
                    </button>
                </div>
                <div className='logout' >
                    <button onClick={ auth.logout } >
                        <p className='text' >Выйти</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DropDown