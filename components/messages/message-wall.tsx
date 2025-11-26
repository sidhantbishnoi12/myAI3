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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const prevCountRef = useRef<number>(0);

  // These must match the header height and input reserve used in page.tsx / CSS
  const headerHeight = "88px"; // matches pt-[88px] in your page
  const inputReserve = "140px"; // reserve space for input bar / footer

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const c = containerRef.current;
    if (c) {
      c.scrollTo({ top: c.scrollHeight, behavior });
      return;
    }
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    const prev = prevCountRef.current;
    const next = messages.length;

    // When new messages are appended, scroll to bottom after layout stabilizes.
    if (next > prev) {
      setTimeout(() => scrollToBottom("smooth"), 35);
    }

    prevCountRef.current = next;
  }, [messages]);

  const containerStyle: React.CSSProperties = {
    height: `calc(100vh - ${headerHeight} - ${inputReserve})`,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "1.25rem",
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
  };

  const messagesInnerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "none",
  };

  const userWrapperStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    boxSizing: "border-box",
    paddingRight: "1.5rem",
  };

  return (
    <div className="message-wall w-full" style={{ boxSizing: "border-box" }}>
      <div ref={containerRef} className="message-wall-scrollable" style={containerStyle}>
        <div className="messages-inner" style={messagesInnerStyle}>
          {messages.map((message, i) => {
            const isLastMessage = i === messages.length - 1;
            return (
              <div key={message.id} className="w-full">
                {message.role === "user" ? (
                  <div className="user-message-wrapper" style={userWrapperStyle}>
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

          {/* end marker */}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
