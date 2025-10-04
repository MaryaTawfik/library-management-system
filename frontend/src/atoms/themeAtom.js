// src/atoms/themeAtom.js
import { atomWithStorage} from "jotai/utils";

const defaultTheme = typeof window !== "undefined"
  ? localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  : "light";

export const themeAtom = atomWithStorage("theme",defaultTheme);
