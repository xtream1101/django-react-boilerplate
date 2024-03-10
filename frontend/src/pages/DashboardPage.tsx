import { ROUTES } from '@/resources/routes-constants'
import { AuthStoreContext } from '@/store/auth';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = observer( () => {

    const authStore = useContext(AuthStoreContext)

    const handleBtnClick = () => {
        authStore.logout()
    }
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 className="text-3xl font-bold underline">
            Hello world!
            </h1>
            <Link to={ROUTES.LOGIN_ROUTE} >Go to Login</Link>

            <button onClick={handleBtnClick}>Logout</button>

        </div>
    )
});

export default DashboardPage;
