import { create } from "zustand";
import type { userStore }  from "@/Types/userType";
const useUserStore = create<userStore>((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    isPro: false,
    authFlag: false,
  },
  writeUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore