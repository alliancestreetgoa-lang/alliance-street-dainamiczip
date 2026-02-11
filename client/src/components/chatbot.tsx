import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const spring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Welcome to Alliance Street Accounting. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message || "Sorry, something went wrong. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Unable to connect. Please check your connection and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "Which countries do you cover?",
    "How can I contact you?",
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ height: "520px" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            data-testid="chatbot-window"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Alliance Street Support</h3>
                  <p className="text-white/70 text-xs">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                data-testid="chatbot-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === "user" ? "bg-red-500/20" : "bg-white/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-white/70" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-red-500 text-white rounded-tr-sm"
                        : "bg-white/8 text-white/90 border border-white/5 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="flex gap-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <div className="bg-white/8 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5">
                      <motion.span
                        className="w-2 h-2 bg-white/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-white/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-white/40 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="space-y-2 mt-2">
                  <p className="text-white/30 text-xs uppercase tracking-wider font-medium">Quick questions</p>
                  {quickQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      className="block w-full text-left text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-2.5 rounded-xl transition-colors"
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          const fakeMsg: Message = { role: "user", content: q };
                          setMessages((prev) => [...prev, fakeMsg]);
                          setInput("");
                          setIsLoading(true);
                          fetch("/api/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              messages: [...messages, fakeMsg].map((m) => ({
                                role: m.role,
                                content: m.content,
                              })),
                            }),
                          })
                            .then((r) => r.json())
                            .then((data) => {
                              setMessages((prev) => [
                                ...prev,
                                { role: "assistant", content: data.reply || "Sorry, something went wrong." },
                              ]);
                            })
                            .catch(() => {
                              setMessages((prev) => [
                                ...prev,
                                { role: "assistant", content: "Unable to connect. Please try again." },
                              ]);
                            })
                            .finally(() => setIsLoading(false));
                        }, 0);
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      data-testid={`quick-question-${i}`}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/5 px-4 py-3 shrink-0">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1 border border-white/5 focus-within:border-red-500/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white text-sm py-2 outline-none placeholder:text-white/30"
                  disabled={isLoading}
                  data-testid="chatbot-input"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="text-red-500 disabled:text-white/20 p-1.5 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={spring}
                  data-testid="chatbot-send"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg shadow-red-500/25"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        data-testid="chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
