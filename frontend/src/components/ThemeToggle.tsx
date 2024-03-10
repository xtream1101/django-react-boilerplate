import React, { useContext } from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite';
import { UIStoreContext } from '@/store/ui';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ThemeToggle = observer(() => {
  const uiStore = useContext(UIStoreContext)

  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    setEnabled(uiStore.themeClass === "dark")
  }, [uiStore.themeClass])

  const handleThemeChange = () => {
    setEnabled(!enabled)
    uiStore.setTheme(enabled ? "light" : "dark")
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={classNames(
        enabled ? 'bg-indigo-600' : 'bg-yellow-500',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-indigo-600" aria-hidden="true" />
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-indigo-600" aria-hidden="true" />
        </span>
      </span>
    </Switch>
  )
});

export default ThemeToggle
