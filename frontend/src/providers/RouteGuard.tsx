
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { AuthStoreContext } from '@/store/auth';
import { Navigate, To } from 'react-router-dom';

const RouteGuard = observer( ({children, requiresAuth, redirectTo}: {children: JSX.Element, requiresAuth: boolean, redirectTo: string}) => {

    const authStore = useContext(AuthStoreContext)

    if (requiresAuth != authStore.isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    return children
});

export default RouteGuard;
