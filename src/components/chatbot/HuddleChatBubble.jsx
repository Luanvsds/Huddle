"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const listener = (event) => setReduced(event.matches)
    query.addEventListener("change", listener)
    return () => query.removeEventListener("change", listener)
  }, [])

  return reduced
}

// Roda uma vez por instância de bolha (a key={message.id} garante isso).
function useTypewriter(text, enabled) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text)

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text)
      return
    }

    setDisplayed("")

    let index = 0

    const interval = setInterval(() => {
      index++

      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [text, enabled])

  return displayed
}

export function ChatMessageBubble({ message }) {
  const isUser = message.role === "user"
  const reducedMotion = usePrefersReducedMotion()
  const shouldAnimate = Boolean(message.animate) && !isUser && !reducedMotion
  const displayed = useTypewriter(message.content, shouldAnimate)

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-linear-to-br from-fuchsia-blue-600 to-cyan-500 text-white"
            : "rounded-bl-sm bg-muted text-foreground",
          message.isError &&
          "border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
        )}
      >
        {message.isError && (
          <AlertCircle className="mb-1 h-3.5 w-3.5" aria-hidden="true" />
        )}
        {displayed}
      </div>
    </div>
  )
}