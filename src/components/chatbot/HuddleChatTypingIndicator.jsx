"use client"

export function ChatTypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
      <span className="sr-only">Huddle.ia está digitando</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  )
}