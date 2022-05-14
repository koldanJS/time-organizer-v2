import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { useFetchData } from '../../../hooks/useFetchData'
import './DropDown.css'

const DropDown = ({ closeDropDown, firstName, lastName, company }) => {

    const navigate = useNavigate()

    // const auth = useContext(AuthContext)

    const { fullLogout } = useFetchData()

    return (
        <>
            <div className='blur' onClick={ closeDropDown } ></div>
            <div className='drop-down' >
                <div className='info' >
                    <p className='text size-22 width-700 name' >{ firstName + ' ' + lastName }</p>
                    <p className='text size-16 company' >{ company }</p>
                </div>
                <div className='settings' >
                    <button onClick={ () => { navigate("/edit-user"); closeDropDown() } } >
                        <p className='text' >Мой профиль</p>
                    </button>
                </div>
                <div className='logout' >
                    <button onClick={ fullLogout } >
                        <p className='text' >Выйти</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default DropDown