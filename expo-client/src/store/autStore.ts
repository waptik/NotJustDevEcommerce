import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user" | "seller";
}

interface AuthState {
    token: string | null;
    user: User | null;
    // setToken: (token: string) => void;
    // setUser: (user: User) => void;
    logout: () => void;
    login: (token: string, user: User) => void;
}

export const useAuth = create(
    persist<AuthState>(
        (set) => ({
            token: null,
            user: null,
            // setToken: (token) => set({ token }),
            // setUser: (user) => set({ user }),
            logout: () => set({ token: null, user: null }),
            login: (token, user) => set({ token, user }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
