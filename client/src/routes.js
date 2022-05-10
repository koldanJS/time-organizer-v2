import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import TimePage from './pages/TimePage/TimePage'
import EditUserPage from './pages/EditUserPage/EditUserPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/time/*" element={<TimePage />} />
                <Route path="/edit-user" element={<EditUserPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}