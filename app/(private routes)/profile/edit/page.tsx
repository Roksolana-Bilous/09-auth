"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProf } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

   const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProf({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to udate user", error);
    }
  };
   
  const handleBack = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleSubmit}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className={css.cancelButton} onClick={handleBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
