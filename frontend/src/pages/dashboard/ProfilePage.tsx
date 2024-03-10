import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { UsersStoreContext } from '@/store/users';
import profileBackgroundImage from '@/assets/images/pexels-anni-roenkae-2832382.jpg';

const ProfilePage = observer(() => {
  const usersStore = useContext(UsersStoreContext)

  return (
    <div>
      <div>
        <img className="h-32 w-full object-cover lg:h-48" src={profileBackgroundImage} alt="" />
      </div>
      <div className="flex flex-col mx-auto max-w-5xl -mt-6 px-4 sm:px-6 lg:px-8">
        <div>
          <span className="inline-flex h-12 w-12 rounded-full items-center justify-center bg-gray-500 ring-4 ring-white">
            <span className="text-xl font-medium leading-none text-white">{usersStore.me?.initials}</span>
          </span>
        </div>
        <div className="mt-2">
          <h1 className="truncate text-2xl font-bold text-gray-900">{usersStore.me?.display_name}</h1>
        </div>
      </div>
    </div >
  )
});

export default ProfilePage;
