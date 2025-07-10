import {create} from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("app-theme") || "dark",

    setTheme: (data) => {
      localStorage.setItem("app-theme", data);
      set({theme: data});
    },
}));