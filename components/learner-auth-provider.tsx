"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};

type LearnerAuthContextType = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  login: (email: string, provider?: string) => void;
  logout: () => void;
};

const LearnerAuthContext = createContext<LearnerAuthContextType | undefined>(undefined);

export function LearnerAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check local storage for dummy session on mount
    const storedUser = localStorage.getItem("learner_session");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch {
        // invalid JSON
      }
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const login = async (email: string, provider?: string) => {
    const profile = {
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " "),
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
    };
    setUser(profile);
    setIsLoggedIn(true);
    setIsModalOpen(false);
    localStorage.setItem("learner_session", JSON.stringify(profile));

    router.push("/home");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: "N/A",
          source: provider ? `Learner Login - ${provider}` : "Learner Login",
        }),
      });
    } catch (error) {
      console.error("Failed to store lead", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("learner_session");
  };

  return (
    <LearnerAuthContext.Provider value={{ isLoggedIn, user, isModalOpen, openModal, closeModal, login, logout }}>
      {children}
    </LearnerAuthContext.Provider>
  );
}

export function useLearnerAuth() {
  const context = useContext(LearnerAuthContext);
  if (context === undefined) {
    throw new Error("useLearnerAuth must be used within a LearnerAuthProvider");
  }
  return context;
}
