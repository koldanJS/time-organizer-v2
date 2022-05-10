import React from 'react'
import { useNavigate } from 'react-router-dom'
import images from '../../components/img/img'
import './HomePage.css'

const HomePage = () => {

    const navigate = useNavigate()

    return (
        <main>
            <div className='home-page' >
                <h1 className='text size-30' >Добро пожаловать в Time Organizer, { 'userName' }</h1>
                <hr className='demiliter' />
                <div className='block' >
                    <div className='block-left' >
                        <h2 className='text size-22' >С чего вы можете начать:</h2>
                        <button onClick={ () => navigate("/projects") } >
                            <img
                                className='little-logo'
                                src={images.writingLogo}
                                alt='Create'
                            />
                            <p className='text' >Создайте проект</p>
                        </button>
                        <button onClick={ () => navigate("/time") } >
                            <img
                                className='little-logo'
                                src={images.beginLogo}
                                alt='Begin'
                            />
                            <p className='text' >Начните отсчет времени</p>
                        </button>
                        <button onClick={ () => navigate("/edit-user") } >
                            <img
                                className='little-logo'
                                src={images.editLogo}
                                alt='Edit'
                            />
                            <p className='text' >Отредактируйте ваши данные</p>
                        </button>
                    </div>
                    <div className='block-right' >
                        <img
                            className='big-logo'
                            src={images.appLogo}
                            alt='App-logo'
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default HomePage