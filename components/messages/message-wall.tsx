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
  // ref to the actual scrollable container
  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const prevCountRef = useRef<number>(0);

  // keep these in sync with your page layout:
  // headerHeight should match the top padding/height reserved for the header in page.tsx (pt-[88px])
  // bottomReserve should match the input/footer reserve (e.g., ~140px in your layout)
  const headerHeight = "88px";
  const bottomReserve = "140px";

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior });
      return;
    }
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    const prev = prevCountRef.current;
    const next = messages.length;

    // If new messages appended, scroll to bottom (small delay to allow layout)
    if (next > prev) {
      // allow layout to stabilize (images/fonts) before scrolling
      setTimeout(() => scrollToBottom("smooth"), 40);
    }

    prevCountRef.current = next;
  }, [messages]);

  // Inline styles create a scrollable area that sits between header and input
  // so intro messages can't appear under the fixed header.
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    // exact height ensures this element can scroll independently of the page
    height: `calc(100vh - ${headerHeight} - ${bottomReserve})`,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "0 1.25rem 1rem 1.25rem",
  };

  const messagesInnerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "none",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    paddingTop: "0.25rem",
    boxSizing: "border-box",
  };

  const userWrapperStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: "2rem",
    boxSizing: "border-box",
  };

  return (
    <div
      className="message-wall w-full"
      // this container sits below the header visually; the scrollable area is containerRef
      style={{
        position: "relative",
        paddingTop: `calc(${headerHeight} + 12px)`, // small gap below header so messages never overlap header
        boxSizing: "border-box",
      }}
    >
      <div ref={containerRef} className="message-wall-scrollable" style={containerStyle}>
        <div className="messages-inner" style={messagesInnerStyle}>
          {messages.map((message, messageIndex) => {
            const isLastMessage = messageIndex === messages.length - 1;
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

          {/* End marker fallback */}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
