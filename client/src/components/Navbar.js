import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className='navbar'>
                <span >Сокращение ссылок</span>
                <ul>
                    <li>
                        <NavLink to='/create' >Создать</NavLink>
                    </li>
                    <li>
                        <NavLink to='/links' >Ссылки</NavLink>
                    </li>
                    <li>
                        <a href='/' onClick={ logoutHandler } >Выйти</a>
                    </li>
                </ul>
            </div>
        </nav>    
    )
}

export default Navbar;
