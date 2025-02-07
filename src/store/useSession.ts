"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface SessionState {
  sessionId: string;
  expiresAt: number;
  createSession: () => void;
  isSessionValid: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessionId: "",
      expiresAt: 0,

      createSession: () => {
        const sessionId = uuidv4(); 
        console.log("New session created:", sessionId);
        
        const expiresAt = Date.now() + 3 * 60 * 60 * 1000;
        
        set({ sessionId, expiresAt });
      },

      isSessionValid: () => {
        return Date.now() < get().expiresAt;
      }
    }),
    {
      name: "session-store",
    }
  )
);
