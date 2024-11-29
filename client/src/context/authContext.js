import { create } from "zustand";

const authContext = create((set) => ({
    authState: JSON.parse(localStorage.getItem("user") || null),
    setAuthState: (newState) => set({authState: newState}),
    }
));

export default authContext;