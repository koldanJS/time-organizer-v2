import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserMenu from './UserMenu/UserMenu'
import HeaderItem from './HeaderItem/HeaderItem'
import images from '../img/img'
import './Header.css'
import DropDown from '../UI/DropDown/DropDown'

const Header = () => {

    const { firstName, lastName, company } = useSelector(state => state.user)

    const [isDropDown, sewIsDropDown] = useState(false)

    const menuProps = { img: images.arrowLogo, firstName, lastName }
    const dropDownProps = { closeDropDown: () => sewIsDropDown(false), firstName, lastName, company }

    const headerItems = [
        {to: '/', label: '', classType: 'home', img: {src: images.homeLogo, alt: 'Home'}},
        {to: '/time', label: 'Время', classType: 'tab', img: ''},
        {to: '/projects', label: 'Проекты', classType: 'tab', img: ''}
    ]

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
                    ? <DropDown {...dropDownProps} />
                    : null
            }
        </header>
    )
}

export default Header