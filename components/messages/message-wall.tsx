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

    if (prev === 0 && next > 0) {
      // initial load: optionally scroll a little but do NOT forcefully jump
      // If you prefer no scroll on initial load, do nothing here.
      // Uncomment below if you want to gently show top of chat (no scroll):
      // return;
      // If you want to scroll to the bottom on initial load, use:
      // scrollToBottom("auto");
    }

    if (next > prev) {
      // New messages appended — scroll to bottom
      scrollToBottom("smooth");
    }

    // update previous count
    prevCountRef.current = next;
  }, [messages]);

  return (
 <div className="message-wall">
  <div className="messages-inner">
    {messages.map((message, idx) => (
      <div key={message.id} className="w-full">
        {message.role === "user" ? (
          <div className="user-message-wrapper">
            {/* user component renders <div className="bubble-user">...</div> */}
            <UserMessage message={message} />
          </div>
        ) : (
          <AssistantMessage message={message} ... />
        )}
      </div>
    ))}

    <div ref={messagesEndRef} />
  </div>
</div>
  );
}
