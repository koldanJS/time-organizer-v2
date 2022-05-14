import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import { useRoutes } from './routes'
import { useFetchData } from './hooks/useFetchData'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import './style/style.css'

const App = () => {
  // Этот хук поможет загрузить все необходимые данные
  const { fetchData, isLoad, isLogout, loading } = useFetchData()
  // Получаем данные авторизации
  const { token, userId, ready, login, logout } = useAuth()
  const isAuth = !!token
  // Устанавливаем доступные (в зав-ти от авторизации) роуты
  const routes = useRoutes(isAuth)
  //Вызывается при каждой перезагрузке и изменении токена
  useEffect(() => {
    if (isAuth) fetchData(token, userId, 'app: fetchData') // Имеет смысл только для авторизованного пользователя
    // Т.к. App рендерится всегда, здесь загружаются все данные и отправляются в redux, чтоб не загружать их асинхронно с каждой страницы
  }, [fetchData, isAuth, ready, isLogout])
  // Если хук авторизации еще не отработал (не загрузил userData из localStorage) или есть авторизация, но не прошла загрузка данных
  if (!ready || (isAuth && (!isLoad || loading)) ) {
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