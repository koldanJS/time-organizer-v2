import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loader from './components/Loader/Loader'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'

const App = () => {
  // Получаем данные авторизации
  const { token, userId, ready, login, logout } = useAuth()
  const isAuthenticated = !!token
  // Устанавливаем доступные (в зав-ти от авторизации) роуты
  const routes = useRoutes(isAuthenticated)
  // Если хук авторизации еще не отработал (не загрузил userData из localStorage)
  if (!ready) {
    // Это позволяет не рендерить роуты пока не загрузится авторизация, тем самым не сбивая текущий url (оставаться на той же странице)
    return <Loader />
  }

  return (
    // Передаем в контекст данные авторизации
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <BrowserRouter>
        <div>
          {
            isAuthenticated
              ? <Navbar />
              : null
          }
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App