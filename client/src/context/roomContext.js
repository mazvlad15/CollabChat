import { create } from "zustand";

const roomContext = create((set) => ({
  selectedRoom: null,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages }),
  setNewMessage: (newMessage) =>
    set((state) => {
      const messageExists = state.messages.some((msg) => msg._id === newMessage._id);
      if (messageExists) {
        return state; 
      }
      return { messages: [...state.messages, newMessage] };
    }),
}));

export default roomContext;
