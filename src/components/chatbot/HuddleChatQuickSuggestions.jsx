"use client"

import { Button } from "@/components/ui/button"

import { QUICK_SUGGESTIONS, useHuddleChat } from "../ui/layout/HuddleChatProvider"

export function QuickSuggestions() {
  const { sendQuickSuggestion } = useHuddleChat()

  return (
    <div className="mt-1 flex flex-col gap-2 px-1">
      <p className="text-xs text-muted-foreground">Perguntas rápidas</p>
      <div className="flex flex-wrap gap-2">
        {QUICK_SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion.id}
            type="button"
            variant="outline"
            size="sm"
            className="h-auto whitespace-normal rounded-full border-fuchsia-blue-300/60 px-3 py-1.5 text-left text-xs font-normal text-fuchsia-blue-700 hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-700/50 dark:text-fuchsia-blue-300 dark:hover:bg-fuchsia-blue-950/40"
            onClick={() => sendQuickSuggestion(suggestion.id)}
          >
            {suggestion.question}
          </Button>
        ))}
      </div>
    </div>
  )
}