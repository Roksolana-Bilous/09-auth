import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "View and edit your profile on NoteHub",
  openGraph: {
    title: "Profile Page",
    description: "View and edit your profile on NoteHub",
    url: `https://notehub.com/profile`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Profile Page",
      },
    ],
    type: "website",
  },
};

export default async function ProfilePage() {
    const user = await getServerMe();
        return (
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <div className={css.header}>
                        <h1 className={css.formTitle}>Profile Page</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
                            Edit Profile
                        </Link>
                    </div>
                    <div className={css.avatarWrapper}>
                        {user?.avatar && (
                        <Image
                            src={user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className={css.avatar}
                            />
                              )}
                    </div>
                    <div className={css.profileInfo}>
                        <p>
                            Username: {user?.username}
                        </p>
                        <p>
                            Email: {user?.email}
                        </p>
                    </div>
                </div>
            </main>
        );
    };