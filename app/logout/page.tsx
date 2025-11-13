"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URI}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout API call failed:", error);
      } finally {
        router.push("/login");
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Logging you out...</p>
    </div>
  );
}
