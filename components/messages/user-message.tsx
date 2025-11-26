// components/messages/user-message.tsx
import { UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";
import React from "react";

export function UserMessage({ message }: { message: UIMessage }) {
  // Combine text parts into a single string for length-check & rendering
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");

  const isLong = text.length > 70; // tweak threshold as desired

  return (
    <div className="user-message-wrapper">
      <div className={`bubble-user ${isLong ? "long" : ""}`}>
        <div className="text-sm">
          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
