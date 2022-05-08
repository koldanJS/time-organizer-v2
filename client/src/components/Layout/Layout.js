import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimpledStore } from '../../../functions/functions'
import Header from '../../Header/Header'
import './Layout.css'

const Layout = props => {

    const { isAuth, isReload } = useSimpledStore()
    const navigate = useNavigate()

    useEffect( () => {
        if (!isAuth || isReload) navigate("/auth")
    })

    return (
        <div className='Layout' >
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}


export default Layout