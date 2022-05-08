import React, { useState } from 'react'
// import { useSimpledStore } from '../../functions/functions'
import UserMenu from './UserMenu/UserMenu'
import HeaderItem from './HeaderItem/HeaderItem'
import images from '../img/img'
import './Header.css'
import DropDown from '../UI/DropDown/DropDown'

const Header = () => {

    const [isDropDown, sewIsDropDown] = useState(false)
    // const { user } = useSimpledStore()
    // const userInfo = user?.info

    const menuProps = { img: images.arrowLogo }
    // if (userInfo) {
    //     menuProps.abbr = userInfo.firstName[0] + (userInfo.lastName[0] || 'N')
    //     menuProps.name = userInfo.firstName
    // }

    const headerItems = [
        {to: '/', label: '', classType: 'home', img: {src: images.homeLogo, alt: 'Home'}},
        {to: '/time', label: 'Время', classType: 'tab', img: ''},
        {to: '/projects', label: 'Проекты', classType: 'tab', img: ''}
    ]

    const closeDropDown = () => { sewIsDropDown(false) }

    return (
        <header>
            <div className='container'>
                <nav>
                    <ul className="header-list">
                        { headerItems.map(item => <HeaderItem key={item.to} {...item} />) }
                    </ul>
                </nav>
                <nav className='header-item menu' >
                    <button onClick={ () => sewIsDropDown(!isDropDown) } >
                        <UserMenu {...menuProps} />
                    </button>
                </nav>
            </div>
            {
                isDropDown
                    ? <DropDown closeDropDown={ closeDropDown } />
                    : null
            }
        </header>
    )
}

export default Header