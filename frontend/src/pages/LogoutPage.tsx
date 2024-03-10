import { AuthStoreContext } from '@/store/auth';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'

const LogoutPage = observer( () => {

    const authStore = useContext(AuthStoreContext)

    authStore.logout()

    return (
        <></>
    )
});

export default LogoutPage;
