import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedWeek } from '../functions'
import { getAuthState } from '../redux/actions/authActions'
import { getProjects } from '../redux/actions/projectActions'
import { getTasks } from '../redux/actions/taskActions'
import { getTimesSheet } from '../redux/actions/timesSheetActions'
import { getActiveItem } from '../redux/actions/activeItemActions'
import { getUser } from '../redux/actions/userActions'
import { useAuth } from './useAuth'
import { useHttp } from './useHttp'

export const useFetchData = () => {
    const { request, loading } = useHttp()
    const { token, userId, ready, logout } = useAuth()
    const dispatch = useDispatch()
    //Создаем состояние в хуке
    const [isLoad, setIsLoad] = useState(false)
    //Эта ф/я будет делать все http запросы на все данные разом
    const fetchData = useCallback(async (logString) => {
        if (!ready) return
        console.log(logString)
        try {
            const user = await request(
                '/api/user',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const projects = await request(
                '/api/project',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const tasks = await request(
                '/api/task',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const timesSheet = await request(
                `/api/timesSheet/${getSelectedWeek(0)[0]}`,   // Строка с датой Пн, выбранной недели
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const activeItem = await request(
                '/api/activeItem',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            // Если есть авторизация и данные получены успешно, добавляем загруженные данные в store
            dispatch(getAuthState({ token, userId, isAuth: !!token }))
            dispatch(getUser(user))
            dispatch(getProjects(projects))
            dispatch(getTasks(tasks))
            dispatch(getTimesSheet(timesSheet))
            dispatch(getActiveItem(activeItem))
            setIsLoad(true) // Показывает что произошла загрузка данных
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
            console.log(e.message)
        }
    }, [token, request])

    const fetchNewTaskItem = useCallback(async (activeItem, deletedActiveItemId, newActiveItem, newTimesSheet, logString) => {
        if (!ready) return
        console.log(logString)
        try {
            if (deletedActiveItemId) {
                await request(
                    '/api/activeItem/delete',
                    'DELETE',
                    { id: deletedActiveItemId },
                    { Authorization: `Bearer ${token}` }
                )
                activeItem = null
            }
            if (newActiveItem) {
                activeItem = await request(
                    '/api/activeItem/create',
                    'POST',
                    { ...newActiveItem },
                    { Authorization: `Bearer ${token}` }
                )
            }
            const timesSheet = await request(
                '/api/timesSheet/edit',
                'PUT',
                { newTimesSheet },
                { Authorization: `Bearer ${token}` }
            )
            // Если все прошло успешно, можно записать состояние в state в redux
            dispatch(getTimesSheet(timesSheet))
            dispatch(getActiveItem(activeItem))
        } catch(e) {
            if (e.message === 'Нет авторизации') logout()
            console.log(e.message)
        }
    }, [token, request])

    return { isLoad, loading, fetchData, fetchNewTaskItem }
}