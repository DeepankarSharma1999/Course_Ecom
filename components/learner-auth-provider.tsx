"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthResult = { ok: boolean; error?: string };

type LearnerAuthContextType = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

const LearnerAuthContext = createContext<LearnerAuthContextType | undefined>(undefined);

// Build a display profile from the server's { name, email }.
function toProfile(u: { name: string | null; email: string }): UserProfile {
  return {
    name: u.name || u.email.split("@")[0].replace(/[^a-zA-Z]/g, " ") || "Learner",
    email: u.email,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.email)}`,
  };
}

export function LearnerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Hydrate from the httpOnly session cookie via the server.
  useEffect(() => {
    fetch("/api/learner/me")
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(toProfile(d.user)); })
      .catch(() => {});
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function postAuth(path: string, body: Record<string, string>): Promise<AuthResult> {
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || "Something went wrong. Please try again." };
      setUser(toProfile(data.user));
      setIsModalOpen(false);
      router.push("/home");
      router.refresh();
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error. Please try again." };
    }
  }

  const login = (email: string, password: string) => postAuth("/api/learner/login", { email, password });

  const register = async (name: string, email: string, password: string) => {
    const result = await postAuth("/api/learner/register", { name, email, password });
    // Keep the lead-capture behaviour on successful sign-up.
    if (result.ok) {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // /api/leads requires a phone (min 6 chars); learner signup doesn't collect one.
        body: JSON.stringify({ name, email, phone: "0000000000", source: "Learner Sign-up" }),
      }).catch(() => {});
    }
    return result;
  };

  const logout = async () => {
    await fetch("/api/learner/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <LearnerAuthContext.Provider
      value={{ isLoggedIn: !!user, user, isModalOpen, openModal, closeModal, login, register, logout }}
    >
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
