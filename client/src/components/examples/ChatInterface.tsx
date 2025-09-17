import { useState } from "react";
import ChatInterface from '../ChatInterface';

export default function ChatInterfaceExample() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-center min-h-[500px]">
        <ChatInterface 
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        AI-powered chat interface for configuration assistance. Try sending a message!
      </p>
    </div>
  );
}