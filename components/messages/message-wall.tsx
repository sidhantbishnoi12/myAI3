// components/messages/message-wall.tsx
"use client";

import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";

export function MessageWall({
  messages,
  status,
  durations,
  onDurationChange,
}: {
  messages: UIMessage[];
  status?: string;
  durations?: Record<string, number>;
  onDurationChange?: (key: string, duration: number) => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevCountRef = useRef<number>(0);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    // Prefer scrolling the end ref; fallback to container scroll if needed
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    } else {
      const container = document.querySelector(".message-wall") as HTMLElement | null;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior });
      }
    }
  };

  useEffect(() => {
    const prev = prevCountRef.current;
    const next = messages.length;

    // On new messages appended, scroll to bottom (small delay to allow layout)
    if (next > prev) {
      setTimeout(() => scrollToBottom("smooth"), 40);
    }

    prevCountRef.current = next;
  }, [messages]);

  // Keep these in sync with header padding in page.tsx (pt-[88px])
  const headerHeight = "88px";
  const headerGap = "12px";

  return (
    <div
      className="message-wall w-full"
      style={{
        // Put message area below the fixed header so intro messages are never rendered inside the header.
        position: "relative",
        paddingTop: `calc(${headerHeight} + ${headerGap})`,
        boxSizing: "border-box",
      }}
    >
      <div className="messages-inner w-full">
        {messages.map((message, messageIndex) => {
          const isLastMessage = messageIndex === messages.length - 1;
          return (
            <div key={message.id} className="w-full">
              {message.role === "user" ? (
                <div className="user-message-wrapper">
                  <UserMessage message={message} />
                </div>
              ) : (
                <AssistantMessage
                  message={message}
                  status={status}
                  isLastMessage={isLastMessage}
                  durations={durations}
                  onDurationChange={onDurationChange}
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
