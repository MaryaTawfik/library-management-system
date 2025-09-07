// src/atoms/authAtom.js
// import { atom } from "jotai";

// const storedUser = JSON.parse(localStorage.getItem("user"));

// export const userAtom = atom(storedUser || null);
// import { atom } from "jotai";

// export const userAtom = atom(null);

// export const tokenAtom = atom(null);

import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage(null);

export const tokenAtom = atomWithStorage(null);
