import { makeAutoObservable } from "mobx"
import { createContext } from "react";

class UIStore {
    supportedThemes = ["light", "dark", "system" as const]
    selectedTheme = "system"
    themeClass = "light" as "light" | "dark"

    constructor() {
        makeAutoObservable(this)
    }

    initTheme = () => {
        const theme = localStorage.theme ? localStorage.theme : "system"
        this.setTheme(theme)
    }

    setTheme = (theme: typeof this.supportedThemes[number]) => {
        if (this.supportedThemes.includes(theme)) {
            this.selectedTheme = theme
        }

        if (
            this.selectedTheme === "dark" ||
            (this.selectedTheme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            this.themeClass = "dark"
            document.documentElement.classList.add("dark")
        } else {
            this.themeClass = "light"
            document.documentElement.classList.remove("dark")
        }

        if (this.selectedTheme === "system") {
            localStorage.removeItem("x-theme")
        } else {
            localStorage.setItem("x-theme", this.selectedTheme)
        }
    }
}

export const uiStore = new UIStore();
export const UIStoreContext = createContext(uiStore);
