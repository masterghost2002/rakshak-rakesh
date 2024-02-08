import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserType } from '../types/types';
type UserStore ={
    user: UserType | undefined;
    setUser: (data: UserType) => void;
    reset: () => void;
    getAccessToken: () => string | undefined;
}
const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (data:UserType) => set({ user:data}),
      getUser: () => get().user,
      reset: () => set({ user: undefined }),
      getAccessToken: () => get().user?.accessToken,
    }),
    {
      name: 'user-data', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
export default useUserStore;