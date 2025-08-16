import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    isPro: false,
    authFlag: false,
  },
  addUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
