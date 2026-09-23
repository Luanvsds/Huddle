"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const HuddleChatContext = createContext(null)

export const CHAT_MESSAGE_MAX_LENGTH = 500

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot",
  content:
    "Oi! Eu sou a Huddle.ia 👋 Posso te ajudar com dúvidas sobre o app: como funciona o app, seu perfil ou qualquer outra coisa da plataforma. O que você quer saber?",
  animate: true,
}

export const QUICK_SUGGESTIONS = [
  {
    id: "o-que-e-um-huddle",
    question: "O que é um Huddle?",
    answer:
      "Um Huddle é quando dois usuários escolhem se conectar, independente de sua compatibilidade, isso não é importante pra gente e pra nossa comunidade, ninguém precisa da pessoa perfeita.",
  },
  {
    id: "como-editar-perfil",
    question: "Como posso editar um perfil?",
    answer:
      'Na aba de perfil, toque em "Editar Perfil" e preencha idioma, plataformas, horários, jogo preferido, microfone e etc. Recomendamos que preencha o máximo de informações possível, para maior chance de encontrar pessoas.',
  },
  {
    id: "duvidas-frequentes",
    question: "Onde posso tirar dúvidas frequentes?",
    answer:
      "Pode seguir perguntando aqui mesmo, ou acessar a página FAQ, para perguntas mais frequentes.",
  },
]

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

class RateLimitError extends Error {
  constructor(retryAfterSeconds, message) {
    super(message || "Limite de mensagens atingido.")
    this.name = "RateLimitError"
    this.retryAfterSeconds = retryAfterSeconds
  }
}

async function requestBotReply(message, history) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  })

  if (response.status === 429) {
    const data = await response.json().catch(() => ({}))
    throw new RateLimitError(data.retryAfter ?? 60, data.error)
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(
      data.error || "Não consegui responder agora. Tenta de novo em instantes."
    )
  }

  const data = await response.json()
  return data.reply
}

export function HuddleChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [rateLimit, setRateLimit] = useState(null)

  const isOpenRef = useRef(false)
  const hasOpenedOnceRef = useRef(false)

  useEffect(() => {
    isOpenRef.current = isOpen
    if (isOpen) {
      setUnreadCount(0)
      if (!hasOpenedOnceRef.current) {
        hasOpenedOnceRef.current = true
        setMessages([WELCOME_MESSAGE])
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!rateLimit) return
    if (rateLimit.retryAfterSeconds <= 0) {
      setRateLimit(null)
      return
    }
    const timeout = setTimeout(() => {
      setRateLimit((prev) =>
        prev ? { ...prev, retryAfterSeconds: prev.retryAfterSeconds - 1 } : prev
      )
    }, 1000)
    return () => clearTimeout(timeout)
  }, [rateLimit])

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const toggleChat = useCallback(() => setIsOpen((open) => !open), [])

  const pushMessage = useCallback((message) => {
    setMessages((prev) => [
      ...prev,
      { animate: false, ...message, id: message.id ?? createId() },
    ])
    if (!isOpenRef.current && message.role === "bot") {
      setUnreadCount((count) => count + 1)
    }
  }, [])

  const sendMessage = useCallback(
    async (rawText) => {
      const text = rawText.trim()
      if (!text || text.length > CHAT_MESSAGE_MAX_LENGTH || isLoading || rateLimit) {
        return
      }

      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role === "user" ? "user" : "model", content: m.content }))

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "user", content: text, animate: false },
      ])
      setInputValue("")
      setIsLoading(true)

      try {
        const reply = await requestBotReply(text, history)
        pushMessage({ role: "bot", content: reply, animate: true })
      } catch (error) {
        if (error.name === "RateLimitError") {
          setRateLimit({
            retryAfterSeconds: error.retryAfterSeconds,
            message: error.message,
          })
        } else {
          pushMessage({
            role: "bot",
            content: error.message || "Algo deu errado. Tenta novamente em instantes.",
            isError: true,
          })
        }
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading, rateLimit, pushMessage]
  )

  const sendQuickSuggestion = useCallback(
    (suggestionId) => {
      const suggestion = QUICK_SUGGESTIONS.find((s) => s.id === suggestionId)
      if (!suggestion || isLoading) return

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "user", content: suggestion.question, animate: false },
      ])
      setIsLoading(true)

      setTimeout(() => {
        pushMessage({ role: "bot", content: suggestion.answer, animate: true })
        setIsLoading(false)
      }, 450)
    },
    [isLoading, pushMessage]
  )

  const clearConversation = useCallback(() => {
    hasOpenedOnceRef.current = true
    setMessages([WELCOME_MESSAGE])
    setRateLimit(null)
    setInputValue("")
  }, [])

  const showSuggestions =
    messages.length === 1 && messages[0]?.id === "welcome" && !isLoading

  const value = useMemo(
    () => ({
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      inputValue,
      setInputValue,
      isLoading,
      unreadCount,
      rateLimit,
      sendMessage,
      sendQuickSuggestion,
      clearConversation,
      showSuggestions,
    }),
    [
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      inputValue,
      isLoading,
      unreadCount,
      rateLimit,
      sendMessage,
      sendQuickSuggestion,
      clearConversation,
      showSuggestions,
    ]
  )

  return (
    <HuddleChatContext.Provider value={value}>{children}</HuddleChatContext.Provider>
  )
}

export function useHuddleChat() {
  const ctx = useContext(HuddleChatContext)
  if (!ctx) {
    throw new Error("useHuddleChat precisa ser usado dentro de <HuddleChatProvider>.")
  }
  return ctx
}