// hooks/useToggleMock.js
"use client";
import { useEffect } from "react";

export function useToggleMock() {
  useEffect(() => {
    async function handleKeyDown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        await fetch("/api/toggle-mock", { method: "POST" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}