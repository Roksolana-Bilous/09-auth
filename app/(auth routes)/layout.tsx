"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
    useEffect(() => {
        router.refresh();
        setLoading(false);
    }, [router]);

    return (
    <div>
      {loading ? <div>Loading...</div> : children}
    </div>
  );
}
