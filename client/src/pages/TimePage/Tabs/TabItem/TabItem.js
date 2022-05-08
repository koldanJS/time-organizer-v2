import React from 'react'
import { NavLink } from 'react-router-dom'
import './TabItem.css'

const TabItem = ({title, to}) => {



    return (
        <li className='tab-item' >
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? 'text active' : 'text'}
            >
                { title }
            </NavLink>
        </li>
    )
}

export default TabItem