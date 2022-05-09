import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from './redux/actions/userActions'
import { getAuthState } from './redux/actions/appActions'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import { useHttp } from './hooks/useHttp'
import { useRoutes } from './routes'
import './style/style.css'

const App = () => {

  const { request, loading } = useHttp()
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // Получаем данные авторизации
  const { token, userId, ready, login, logout } = useAuth()
  const isAuth = !!token
  // Устанавливаем доступные (в зав-ти от авторизации) роуты
  const routes = useRoutes(isAuth)
  // Т.к. App рендерится всегда, здесь загружаются данные user и отправляются в redux, чтоб не загружать их асинхронно с каждой страницы
  const fetchUser = useCallback(async () => {
    console.log('app: getUser')
    try {
      const user = await request(
          '/api/user',
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
      )
      // Если есть авторизация и данные получены успешно, добавляем пользователя и данные авторизации в store
      dispatch(getUser(user))
      dispatch(getAuthState({ token, userId, ready }))
      setUser(user)
    } catch(e) {
      if (e.message === 'Нет авторизации') logout()
    }
  }, [token, request])
  //Вызывается при каждой перезагрузке и изменении токена
  useEffect(() => {
    if (isAuth) fetchUser()
  }, [fetchUser])

  // Если хук авторизации еще не отработал (не загрузил userData из localStorage) или есть авторизация, но не прошла загрузка данных
  if (!ready || (isAuth && (!user || loading)) ) {
    // Это позволяет не рендерить роуты пока не загрузится авторизация, тем самым не сбивая текущий url (оставаться на той же странице)
    return <main><Loader /></main>
  }

  return (
    // Передаем в контекст данные авторизации
    <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
      <BrowserRouter>
        {
          isAuth
            ? <Header />
            : null
        }
        { routes }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App