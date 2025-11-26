// components/messages/user-message.tsx
import { UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";

export function UserMessage({ message }: { message: UIMessage }) {
  return (
    <div className="w-full flex">
      <div className="ml-auto max-w-[70%]">
        <div className="bubble-user">
          <div className="text-sm">
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <Response key={`${message.id}-${i}`}>
                      {part.text}
                    </Response>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
