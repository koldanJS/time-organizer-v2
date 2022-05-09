import React from 'react'
import './UserMenu.css'

const UserMenu = ({ img, firstName, lastName }) => {

    const abbr = (firstName[0] + lastName[0]) || 'UN'   // Сокращение от UserName

    return (
        <>
            <div className='circle'>
                <p className='text size-20 width-900 color-white' >{ abbr }</p>
            </div>
            <div className='user-name'>
                <p className='text size-20' >{ firstName }</p>
            </div>
            <div className='user-settings'>
                <img src={ img } alt="Arrow"/>
            </div>
        </>
    )
}

export default UserMenu