import { useState, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState } from '../redux/actions/authActions'
import { getProjects } from '../redux/actions/projectActions'
import { getTasks } from '../redux/actions/taskActions'
import { getTimesSheet } from '../redux/actions/timesSheetActions'
import { getArchive } from '../redux/actions/archiveActions'
import { getActiveItem } from '../redux/actions/activeItemActions'
import { getUser } from '../redux/actions/userActions'
import { AuthContext } from '../context/AuthContext'
import { useAuth } from './useAuth'
import { useHttp } from './useHttp'
import { useMessage } from './useMessage'

export const useFetchData = () => {

    const { request, loading } = useHttp()
    const { token } = useAuth()
    const auth = useContext(AuthContext)
    const { setMessageState } = useMessage()

    const dispatch = useDispatch()
    const { selectedWeek } = useSelector(state => state.app)

    //Создаем состояние в хуке
    const [isLoad, setIsLoad] = useState(false)

    const sessionError = () => {
        setMessageState('Ошибка сеанса, авторизуйтесь', 'error', 'main-message')
    }

    const fullLogout = () => {
        auth.logout()
        dispatch(getAuthState({}))
    }

    //Эта ф/я будет делать все http запросы на все данные разом
    const fetchData = useCallback(async (token, userId, logString) => {
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
                `/api/timesSheet/${selectedWeek[0]}`,   // Строка с датой Пн, выбранной недели
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const archive = await request(
                '/api/archive',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            const activeItem = await request(
                '/api/ActiveItem',
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
            dispatch(getArchive(archive))
            dispatch(getActiveItem(activeItem))
            setIsLoad(true) // Показывает что произошла загрузка данных
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const fetchProjectData = useCallback(async (logString) => {
        console.log(logString)
        try {
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
            dispatch(getProjects(projects))
            dispatch(getTasks(tasks))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const createProject = useCallback(async (form, newTasks, logString) => {
        console.log(logString)
        try {
            const response = await request(
                '/api/project/create',
                'POST',
                { ...form, newTasks },
                { Authorization: `Bearer ${token}` }
            )
            return response
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const editProject = useCallback(async (form, projectId, newTasks, deletedTasksId, logString) => {
        console.log(logString)
        try {
            const response = await request(
                '/api/project/edit',
                'PUT',
                { ...form, projectId, newTasks, deletedTasksId },
                { Authorization: `Bearer ${token}` }
            )
            return response
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const deleteProject = useCallback(async (projectId, logString) => {
        console.log(logString)
        try {
            const response = await request(
                '/api/project/delete',
                'DELETE',
                { projectId },
                { Authorization: `Bearer ${token}` }
            )
            return response
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const fetchNewTaskItem = useCallback(async (timesSheetId, dayNumber, newTaskItem, logString, index = -1, isDelete = false) => {
        console.log(logString)
        try {
            const timesSheet = await request(
                '/api/timesSheet/edit',
                'PUT',
                { timesSheetId, dayNumber, newTaskItem, index, isDelete },
                { Authorization: `Bearer ${token}` }
            )
            // Если все прошло успешно, можно записать состояние в state в redux
            dispatch(getTimesSheet(timesSheet))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const startTracking = useCallback(async (index, logString) => {
        console.log(logString)
        try {
            const activeItem = await request(
                '/api/ActiveItem/create',
                'POST',
                { itemIndex: index },
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getActiveItem(activeItem))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const stopTracking = useCallback(async (logString) => {
        console.log(logString)
        try {
            const response = await request(
                '/api/ActiveItem/stop',
                'DELETE',
                null,
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getActiveItem(null))
            dispatch(getTimesSheet(response.editTimesSheet))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const createTimesSheet = useCallback(async (dateString, logString) => {
        console.log(logString)
        try {
            const timesSheet = await request(
                `/api/timesSheet/create/${dateString}`,   // Строка с датой Пн, выбранной недели
                'POST',
                null,
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getTimesSheet(timesSheet))
            return timesSheet
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const fetchTimesSheet = useCallback(async (dateString, token, logString) => {
        console.log(logString)
        try {
            const timesSheet = await request(
                `/api/timesSheet/${dateString}`,   // Строка с датой Пн, выбранной недели
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getTimesSheet(timesSheet))
        } catch(e) {
            console.log('fetchTimesSheet')
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const createArchive = useCallback(async (dateString, logString) => {
        console.log(logString)
        try {
            const archive = await request(
                `/api/archive/create/${dateString}`,
                'POST',
                null,
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getArchive(archive))
            dispatch(getTimesSheet(null))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    const deleteArchive = useCallback(async (id, logString) => {
        console.log(logString)
        try {
            const archive = await request(
                '/api/archive/delete',
                'DELETE',
                { id },
                { Authorization: `Bearer ${token}` }
            )
            dispatch(getArchive(archive))
        } catch(e) {
            if (e.message === 'Нет авторизации') sessionError()
            console.log(e.message)
        }
    }, [token, request])

    return {
        isLoad,
        loading,
        fullLogout,
        fetchData,
        fetchProjectData,
        createProject,
        editProject,
        deleteProject,
        fetchNewTaskItem,
        startTracking,
        stopTracking,
        createTimesSheet,
        fetchTimesSheet,
        createArchive,
        deleteArchive
    }
}