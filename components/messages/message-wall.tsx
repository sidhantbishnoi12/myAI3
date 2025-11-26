// components/messages/message-wall.tsx
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef<number>(0);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    const prev = prevCountRef.current;
    const next = messages.length;

    // On initial load we don't force a jump. If new messages are appended (next > prev),
    // scroll to bottom smoothly.
    if (next > prev) {
      scrollToBottom("smooth");
    }

    prevCountRef.current = next;
  }, [messages]);

  return (
    <div className="message-wall">
      <div className="messages-inner">
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

