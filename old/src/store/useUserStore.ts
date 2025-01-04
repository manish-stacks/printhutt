'use client'

import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    isLoggedIn: boolean;
    userDetails: {
        id: string;
        username: string;
        email: string;
    } | null;
    login: (user: { id: string; username: string; email: string }) => void;
    logout: () => void;
    getUserDetails: () => { id: string; username: string; email: string } | null;
    fetchUserDetails: () => Promise<void>;
}


export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            userDetails: null,
            login: (user) => {
                set({ isLoggedIn: true, userDetails: user });
            },
            logout: async () => {
                try {
                    await axios.get("/api/auth/logout");
                    set({ isLoggedIn: false, userDetails: null });
                } catch (error) {
                    toast.error("Error logging out");
                    console.error(error);
                }
            },
            fetchUserDetails: async () => {
                try {
                    const { data } = await axios.post('/api/auth/me');
                    if (data.success) {
                        set({ isLoggedIn: true, userDetails: data.user });
                    } else {
                        set({ isLoggedIn: false, userDetails: null });
                    }
                } catch (error) {
                    toast.error('Failed to fetch user details')
                    console.error("Failed to fetch user details:", error);
                }
            },
            getUserDetails: () => {
                return get().userDetails;
            },
        }),
        {
            name: 'user-store',
        }
    )
)


