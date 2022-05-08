import React from 'react'
import './UserMenu.css'

const UserMenu = ({abbr = 'UN', name = 'Username', img }) => {


    return (
        <>
            <div className='circle'>
                <p className='text size-20 width-900 color-white' >{abbr}</p>
            </div>
            <div className='user-name'>
                <p className='text size-20' >{name}</p>
            </div>
            <div className='user-settings'>
                <img src={img} alt="Arrow"/>
            </div>
        </>
    )
}

export default UserMenu