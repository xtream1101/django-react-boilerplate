import React, { Fragment, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom';
import RouteGuard from '@/providers/RouteGuard';
import { ROUTES } from '@/resources/routes-constants';
import AppSidebar from '@/components/AppSidebar';
import AppMobileHeader from '@/components/AppMobileHeader';
import { Dialog, Transition } from '@headlessui/react'
import {
    FolderIcon,
    HomeIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { IAppNavigationItem } from '@/types/app';
import { useLocation } from 'react-router-dom';

const AppLayout = observer(() => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [currentNavItem, setCurrentNavItem] = useState<IAppNavigationItem>()

    const navigation: IAppNavigationItem[] = useMemo(() => [
        { name: 'Dashboard', route: ROUTES.DASHBOARD_ROUTE, icon: HomeIcon },
        { name: 'Projects', route: ROUTES.PROJECTS_ROUTE, icon: FolderIcon },
    ], []);

    const location = useLocation();

    React.useEffect(() => {
        const navItem = navigation.find(item => item.route === location.pathname)
        setCurrentNavItem(navItem)
    }, [location, navigation]);

    function handleMobileHeaderClick() {
        setSidebarOpen(true)
    }

    return (
        <RouteGuard
            requiresAuth={true}
            redirectTo={ROUTES.LOGIN_ROUTE}
        >
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <AppSidebar navigation={navigation} currentNavItem={currentNavItem} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <AppSidebar navigation={navigation} currentNavItem={currentNavItem} />
                </div>

                <AppMobileHeader onClick={handleMobileHeaderClick} currentNavItem={currentNavItem} />

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8"><Outlet /></div>
                </main>

            </div>
        </RouteGuard>
    )
});

export default AppLayout;
