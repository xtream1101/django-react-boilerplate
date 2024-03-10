import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { IAppNavigationItem } from '@/types/app';
import { Link } from 'react-router-dom';
import { UsersStoreContext } from '@/store/users';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

interface IAppSidebarProps {
    navigation: IAppNavigationItem[]
    currentNavItem: IAppNavigationItem | undefined
}

const AppSidebar = observer(({ navigation, currentNavItem }: IAppSidebarProps) => {
    const usersStore = useContext(UsersStoreContext)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                <div className="flex h-16 shrink-0 items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.route}
                                            className={classNames(
                                                item.route === currentNavItem?.route
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="-mx-6 mt-auto flex items-center justify-between">
                            <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                            >
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                                    <span className="text-lg font-medium leading-none text-white">{usersStore.me?.initials}</span>
                                </span>
                                <span aria-hidden="true">{usersStore.me?.display_name}</span>
                            </a>
                            <Link
                                to="/logout"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-red-500 hover:bg-gray-800"
                            >
                                <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
});

export default AppSidebar;
