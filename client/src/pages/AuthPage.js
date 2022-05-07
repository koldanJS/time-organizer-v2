import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({ email: '', password: '' })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        console.log('register')
        try {
            //Чтоб запрос шел на порт 5000, как у сервера, в package.json
            //добавлено "proxy": "http://localhost:5000"
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch(e) {}
    }

    const loginHandler = async () => {
        console.log('login')
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch(e) {}
    }

    return (
        <div>
            <h1>Auth Page</h1>
            <form>
                <input
                    name='email'
                    value={form.email}
                    placeholder='email...'
                    onChange={changeHandler}
                />
                <input
                    name='password'
                    value={form.password}
                    placeholder='password...'
                    onChange={changeHandler}
                />
                <button
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Зарегистрироваться
                </button>
                <button
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}

export default AuthPage