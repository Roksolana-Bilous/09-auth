"use client";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { LoginRequestData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        try {
            const data = Object.fromEntries(formData) as LoginRequestData;
            const response = await login(data);

            if (response) {
                setUser(response);
                router.push("/profile");
            } else {
                setError("Wrong email of password");
            }
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            setError(
                err.response?.data?.error ??
                err.message ??
                "Something went wrong")
        };
        }

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
