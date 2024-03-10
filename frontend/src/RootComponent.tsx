import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppPage from './pages/AppPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import { observer } from 'mobx-react-lite'
import RouteGuard from './providers/RouteGuard'
import AppLayout from './layouts/AppLayout'
import LogoutPage from './pages/LogoutPage'
import ExamplePage from './pages/ExamplePage'

 const RootComponent = observer( () => {

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
                        element={
                            <AppPage />
                        }
                    />
                    <Route
                        path={ROUTES.PROJECTS_ROUTE}
                        element={ <div>Projects</div> }
                    />
                </Route>


            </Routes>
        </Router>
    )
});

export default RootComponent;
