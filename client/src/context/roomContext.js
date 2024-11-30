import { create } from "zustand";

const roomContext = create((set) => ({
    selectedRoom: null,
    setSelectedRoom: (selectedRoom) => set({selectedRoom}),
    messages: [],
    setMessages: (messages) => set({messages}),
}))

export default roomContext;