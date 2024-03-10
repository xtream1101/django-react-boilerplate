
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { AuthStoreContext } from '@/store/auth';
import {
    Bars3Icon,
  } from '@heroicons/react/24/outline'
import { IAppNavigationItem } from '@/types/app';

interface IAppMobileHeaderProps {
    onClick: () => void
    currentNavItem: IAppNavigationItem|undefined
}

const AppMobileHeader = observer( ({onClick, currentNavItem}: IAppMobileHeaderProps) => {

    const authStore = useContext(AuthStoreContext)

    return (
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={onClick}>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-white">{currentNavItem?.name}</div>
        </div>
    )
});

export default AppMobileHeader;
