import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  className?: string;
  userRole?: "admin" | "user";
}

export default function ChatInterface({ isMinimized = false, onToggleMinimize, className, userRole = "admin" }: ChatInterfaceProps) {
  const getInitialMessage = () => {
    if (userRole === "admin") {
      return "Hello! I'm your AI configuration assistant. I can help you set up connectors, troubleshoot issues, configure monitoring, and optimize your application diagnostics. How can I help you today?";
    } else {
      return "Hello! I'm your AI assistant for application monitoring. I can help you analyze logs, traces, code issues, and provide insights about your applications. What would you like to know?";
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: getInitialMessage(),
      sender: "assistant",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user", 
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response based on user role
    setTimeout(() => {
      let responses: string[];
      
      if (userRole === "admin") {
        responses = [
          "I can help you configure that connector. Let me walk you through the setup process...",
          "Based on your application metrics, I recommend setting up monitoring alerts for these key indicators...", 
          "I've analyzed your logs and found a few potential issues. Here's what I suggest...",
          "That's a great question about runbook automation. Let me explain the best practices...",
          "I can help you set up GitHub integration for your code repository monitoring...",
          "Let me configure the CloudWatch logs connector for better observability...",
          "I recommend enabling these security connectors for comprehensive monitoring..."
        ];
      } else {
        responses = [
          "I've analyzed your application logs and found some interesting patterns...",
          "Looking at your traces, I can see the performance bottlenecks in your system...",
          "Your code metrics show good coverage, but here are some areas for improvement...",
          "Based on the error logs, I suggest checking these specific functions...",
          "I can help you understand the correlation between your logs and traces...",
          "Let me break down the performance issues I found in your application...",
          "Your monitoring data shows some anomalies that we should investigate..."
        ];
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    console.log("Message sent:", inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <Card className={cn("w-80", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Assistant
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onToggleMinimize}
              data-testid="button-chat-maximize"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={cn("w-80 h-96 flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
              Online
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onToggleMinimize}
              data-testid="button-chat-minimize"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "assistant" && (
                  <Avatar className="w-6 h-6 mt-1">
                    <AvatarFallback>
                      <Bot className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {message.content}
                </div>
                
                {message.sender === "user" && (
                  <Avatar className="w-6 h-6 mt-1">
                    <AvatarFallback>
                      <User className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <Avatar className="w-6 h-6 mt-1">
                  <AvatarFallback>
                    <Bot className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={userRole === "admin" ? "Ask about connectors, configurations..." : "Ask about logs, traces, code issues..."}
            className="flex-1"
            data-testid="input-chat-message"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}