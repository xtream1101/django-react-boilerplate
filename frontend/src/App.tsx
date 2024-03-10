import React, { useContext } from 'react';
import './App.css';
import RootComponent from './RootComponent'
import { observer } from 'mobx-react-lite';
import { AuthStoreContext } from './store/auth';
import { UsersStoreContext } from './store/users';

const App = observer(() => {

    const authStore = useContext(AuthStoreContext)
    const usersStore = useContext(UsersStoreContext)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function silentLogin() {
            try {
                await authStore.silentLogin()
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        silentLogin()
    }, [authStore])

    React.useEffect(() => {
        if (authStore.isAuthenticated) {
            usersStore.fetchMe()
        } else {
            usersStore.clearData()
        }
    }, [authStore, authStore.isAuthenticated, usersStore])

    if (isLoading || authStore.isAuthenticating) {
        return (
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1>...</h1>
            </div>
        )
    }

    return (
        <RootComponent />
    );
})

export default App;
