"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function AIAgentChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Hide on auth pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/signin"
  ) {
    return null;
  }

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsLoading(true);
    const userMessage = message.trim();

    // Add user message to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "user", text: userMessage, timestamp: new Date() },
    ]);

    setMessage(""); // Clear input

    try {
      const response = await fetch(
        "https://hook.eu1.make.com/dkhdswo943eo1zqded5h9pwttjl63l4u",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Check if response contains the "response" key
        if (data && data.response) {
          // Add AI response to chat
          setChatHistory((prev) => [
            ...prev,
            {
              type: "agent",
              text: data.response,
              timestamp: new Date(),
            },
          ]);
          toast.success("Response received!");
        } else {
          // Fallback if no response key
          setChatHistory((prev) => [
            ...prev,
            {
              type: "agent",
              text: "Thank you! Our AI agent has received your message and will process your request shortly.",
              timestamp: new Date(),
            },
          ]);
          toast.success("Message sent successfully!");
        }
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");

      // Add error message to chat
      setChatHistory((prev) => [
        ...prev,
        {
          type: "error",
          text: "Sorry, there was an error sending your message. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format message text to make URLs clickable
  const formatMessageText = (text) => {
    if (!text) return "";

    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedText = text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 underline break-all">${url}</a>`;
    });

    // Convert line breaks to <br> tags
    return formattedText.replace(/\n/g, "<br />");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          isIconOnly
          color="primary"
          size="lg"
          className="w-16 h-16 rounded-full shadow-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-white dark:bg-brand-deepdark rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-brand-white dark:bg-brand-deepdark p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-brand-dark text-lg dark:text-white poppins_medium">
                      Luxora AI
                    </h3>
                    <p className="text-brand-dark/80 text-xs dark:text-white/80 poppins_regular">
                      Your AI Property Assistant
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-brand-dark/80 dark:text-white/80 dark:hover:text-white hover:text-brand-dark transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-brand-light dark:bg-brand-dark">
                {/* Welcome Message */}
                {chatHistory.length === 0 && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        👋 Hi! I'm Luxora AI, your property assistant. How can I
                        help you find your dream home today?
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Try: "I'm looking for a 4 bedroom house"
                      </p>
                    </div>
                  </div>
                )}

                {/* Chat History */}
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      msg.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {msg.type !== "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 max-w-[80%] ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : msg.type === "error"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-tl-none"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {msg.type === "agent" ? (
                        <p
                          className="text-sm whitespace-pre-wrap poppins_regular"
                          dangerouslySetInnerHTML={{
                            __html: formatMessageText(msg.text),
                          }}
                        />
                      ) : (
                        <p className="text-sm whitespace-pre-wrap poppins_regular">
                          {msg.text}
                        </p>
                      )}
                      <p className="text-xs opacity-60 mt-1 roboto_regular">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 poppins_regular">
                          Processing...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-2 bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-brand-dark">
                <div className="flex items-end gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1"
                    classNames={{
                      input:
                        "text-sm bg-transparent outline-none poppins_regular",
                      inputWrapper: "bg-transparent transition-colors",
                    }}
                  />
                  <Button
                    isIconOnly
                    onClick={sendMessage}
                    disabled={isLoading || !message.trim()}
                    className="flex-shrink-0 bg-brand-primary disabled:cursor-default disabled:hover:bg-blue-300 disabled:bg-blue-300"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
