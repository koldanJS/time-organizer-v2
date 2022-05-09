import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import ProjectsListPage from './pages/ProjectsListPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import TimePage from './pages/TimePage/TimePage'
import EditUserPage from './pages/EditUserPage/EditUserPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects-list" element={<ProjectsListPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/time/*" element={<TimePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/edit-user" element={<EditUserPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
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