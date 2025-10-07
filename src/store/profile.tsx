import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface Profile {
  userName: string | null;
  role: string | null;
  setUserName: (data: string | null) => void;
  setRole: (data: string | null) => void;
}

export const useProfile = create<Profile>()(
  devtools(
    persist(
      (set) => ({
        userName: null,
        role: null,
        setUserName: (data: string | null) => set(() => ({ userName: data })),
        setRole: (data: string | null) => set(() => ({ role: data })),
      }),
      { name: "profile" }
    )
  )
);
