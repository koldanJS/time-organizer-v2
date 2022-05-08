import React from 'react'
import TabItem from './TabItem/TabItem'
import './Tabs.css'

const Tabs = () => {

    const tabs = [
        { title: 'Табель учета рабочего времени', to: '/time/current' },
        // { title: 'В ожидании утверждения', to: '/time/pending' },
        { title: 'Архив', to: '/time/archive' }
    ]

    return (
        <nav className='tabs'>
            <ul>
                {
                    tabs.map((tab, index) => <TabItem key={index} {...tab} />)
                }
            </ul>
        </nav>
    )
}

export default Tabs