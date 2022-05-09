import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/useHttp'
import AuthForm from '../../components/UI/AuthForm/AuthForm'
import Message from '../../components/UI/Message/Message'
import images from '../../components/img/img'
import './AuthPage.css'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState(false)
    const { loading, request } = useHttp()
    const [isRegistered, setIsRegistered] = useState(true)

    const showMessage = () => {
        setTimeout(() => {
            setMessage(false)
        }, 3000);
        return <Message message={ message.message } type={ message.type } />
    }

    const register = async (event, form) => {
        event.preventDefault()
        try {
            //Чтоб запрос шел на порт 5000, как у сервера, в package.json
            //добавлено "proxy": "http://localhost:5000"
            const data = await request('/api/auth/register', 'POST', {...form})
            setMessage({ message: data.message, type: 'success' })
        } catch(e) {
            setMessage({ message: e.message, type: 'error' })
        }
    }

    const login = async (event, form) => {
        event.preventDefault()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch(e) {
            setMessage({ message: e.message, type: 'error' })
        }
    }

    return (
        <main>
            <div className='auth' >
                <img src={ images.appLogo } alt='Auth-logo' className='auth-logo' />
                <div className='auth-items' >
                    <h1 className='auth-text text size-30 width-700' >{ isRegistered ? 'Войдите в Time Organizer' : 'Зарегистрируйтесь в Time Organizer' }</h1>
                    <AuthForm
                        label={ isRegistered ? 'Войдите с логином и паролем' : 'Зарегистрируйтесь с логином и паролем' }
                        buttonText={ isRegistered ? 'Войти' : 'Зарегистрироваться' }
                        placeholders={{ email: 'Email...', password: 'Пароль...' }}
                        submitHandler={ isRegistered ? login : register }
                        linkText={ isRegistered ? 'Зарегистрироваться' : 'Авторизоваться' }
                        changeForm={ () => setIsRegistered(!isRegistered) }
                        loading={ loading }
                        // forgotPasswordText={ isRegistered ? 'Восстановить пароль' : null }
                        // forgotPassword={ forgotHandler }
                    />
                    {
                        message
                            ? showMessage()
                            : null
                    }
                </div>
            </div>
        </main>
    )
}

export default AuthPage