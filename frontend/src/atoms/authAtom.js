// src/atoms/authAtom.js
import { atom } from "jotai";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const userAtom = atom(storedUser || null);
