"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CHAT_MESSAGE_MAX_LENGTH, useHuddleChat } from "../ui/layout/HuddleChatProvider.jsx"
import { ChatMessageBubble } from "./HuddleChatBubble.jsx"
import { ChatTypingIndicator } from "./HuddleChatTypingIndicator.jsx"
import { QuickSuggestions } from "./HuddleChatQuickSuggestions"
import { useToggleMock } from "../hook/useToggleMock.js"

export function HuddleChatWidget() {
  useToggleMock();

  const {
    isOpen,
    toggleChat,
    closeChat,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    unreadCount,
    rateLimit,
    sendMessage,
    clearConversation,
    showSuggestions,
  } = useHuddleChat()

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isOpen) return
    const timeout = setTimeout(() => textareaRef.current?.focus(), 250)
    return () => clearTimeout(timeout)
  }, [isOpen])

  // Fecha com Esc — comportamento padrão de widgets flutuantes.
  useEffect(() => {
    if (!isOpen) return
    function handleEscape(event) {
      if (event.key === "Escape") closeChat()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeChat])

  const remaining = CHAT_MESSAGE_MAX_LENGTH - inputValue.length
  const isOverLimit = remaining < 0
  const isNearLimit = remaining <= 50 && remaining >= 0
  const canSend = inputValue.trim().length > 0 && !isOverLimit && !isLoading && !rateLimit

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSend) return
    sendMessage(inputValue)
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  function handleTextareaChange(event) {
    setInputValue(event.target.value)
    const el = event.target
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`
  }

  return (
    <TooltipProvider delayDuration={300}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat de suporte Huddle.ia"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 origin-bottom-right sm:right-6"
          >
            <Card className="flex h-128 max-h-[75vh] w-92 max-w-[92vw] flex-col gap-0 overflow-hidden border-fuchsia-blue-950/10 py-0 shadow-2xl shadow-fuchsia-blue-950/20 dark:border-fuchsia-blue-400/10">
              <div className="flex items-center gap-3 bg-linear-to-r from-fuchsia-blue-700 to-black px-4 py-3 text-white">
                <Avatar className="h-9 w-9 border border-white/25 bg-white/10">
                  <AvatarFallback className="bg-transparent text-white">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 leading-tight">
                  <p className="text-sm font-semibold">Huddle.ia</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Assistente virtual
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                      onClick={clearConversation}
                      aria-label="Limpar conversa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Limpar conversa</TooltipContent>
                </Tooltip>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/15 hover:text-white"
                  onClick={closeChat}
                  aria-label="Fechar chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 min-h-0">
                <div role="log" aria-live="polite" className="flex flex-col gap-3 px-3 py-3">
                  {messages.map((message) => (
                    <ChatMessageBubble key={message.id} message={message} />
                  ))}
                  {isLoading && <ChatTypingIndicator />}
                  {showSuggestions && <QuickSuggestions />}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {rateLimit && (
                <div className="flex items-center gap-2 border-t border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Muitas mensagens em pouco tempo. Aguarde{" "}
                    <span className="font-mono">{rateLimit.retryAfterSeconds}s</span> pra
                    continuar.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="border-t border-border p-3">
                <div className="flex items-end gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Escreva sua dúvida sobre o Huddle..."
                    rows={1}
                    disabled={Boolean(rateLimit)}
                    className="max-h-28 min-h-9 flex-1 resize-none rounded-xl"
                    aria-label="Mensagem para o Huddle.ia"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!canSend}
                    className="h-9 w-9 shrink-0 rounded-full bg-linear-to-br from-fuchsia-blue-600 to-black text-white hover:opacity-90 disabled:opacity-40"
                    aria-label="Enviar mensagem"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-1.5 flex items-center justify-between px-1">
                  <span className="text-[11px] text-muted-foreground">
                    Huddle.ia responde só sobre o app.
                  </span>
                  <span
                    className={`font-mono text-[11px] ${isOverLimit
                      ? "text-red-500"
                      : isNearLimit
                        ? "text-amber-500"
                        : "text-muted-foreground"
                      }`}
                  >
                    {inputValue.length}/{CHAT_MESSAGE_MAX_LENGTH}
                  </span>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleChat}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-blue-600 to-black text-white shadow-lg shadow-fuchsia-blue-900/30 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        aria-label={isOpen ? "Fechar chat de suporte" : "Abrir chat de suporte"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {unreadCount > 0 && !isOpen && (
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-red-500 p-0 font-mono text-[10px] text-white hover:bg-red-500">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </motion.button>
    </TooltipProvider>
  )
}