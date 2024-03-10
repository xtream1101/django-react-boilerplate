import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import HomePage from './pages/dashboard/HomePage'
import ProjectsPage from './pages/dashboard/ProjectsPage'
import ProfilePage from './pages/dashboard/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import { observer } from 'mobx-react-lite'
import RouteGuard from './providers/RouteGuard'
import AppLayout from './layouts/AppLayout'
import LogoutPage from './pages/auth/LogoutPage'

const RootComponent = observer(() => {

    return (
        <Router>
            <Routes>
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

                <Route
                    path={ROUTES.LOGIN_ROUTE}
                    element={
                        <RouteGuard
                            requiresAuth={false}
                            redirectTo={ROUTES.DASHBOARD_ROUTE}
                        >
                            <LoginPage />
                        </RouteGuard>
                    }
                />
                <Route
                    path={ROUTES.LOGOUT_ROUTE}
                    element={
                        <RouteGuard
                            requiresAuth={true}
                            redirectTo={ROUTES.LOGIN_ROUTE}
                        >
                            <LogoutPage />
                        </RouteGuard>
                    }
                />
                <Route element={<AppLayout />}>
                    <Route
                        path={ROUTES.DASHBOARD_ROUTE}
                        element={<HomePage />}
                    />
                    <Route
                        path={ROUTES.PROJECTS_ROUTE}
                        element={<ProjectsPage />}
                    />
                    <Route
                        path={ROUTES.PROFILE_ROUTE}
                        element={<ProfilePage />}
                    />
                </Route>
            </Routes>
        </Router>
    )
});

export default RootComponent;
