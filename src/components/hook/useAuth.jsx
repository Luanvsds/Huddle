// hooks/useAuth.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("user_apelido");

    if (logged) {
      setAuthorized(true);
    } else {
      router.replace("/conecte-se");
    }
  }, [router]);

  return authorized;
}