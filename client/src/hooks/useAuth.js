import { useState, useCallback, useEffect } from 'react'

export const storageName = 'time-organizer/userData'

export const useAuth = () => {
    // Устанавливаем начальные состояния (при перезагрузке страницы)
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    // Делаем функцию экземпляром одного объекта при неизменных аргументах (их нет)
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userId: id }))
    }, [])
    // Делаем функцию экземпляром одного объекта при неизменных аргументах (их нет)
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])
    // Будет вызываться только при перезагрузке страницы, т.к. login мемоизирована
    useEffect(() => {
        // Здесь мы получаем данные пользователя, если он был авторизован
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) login(data.token, data.userId)
        // Показываем что useEffect отработал и получил сохраненные данные авторизации
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}