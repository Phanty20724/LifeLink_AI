import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, User, Loader2, MessageSquare } from "lucide-react";
import type { TriageResponse } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  urgencyScore?: number;
  medicalFlags?: string[];
  firstAid?: string[];
}

interface AIChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

export default function AIChat({ messages: initialMessages, onSendMessage }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [input, setInput] = useState("");
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const triageMutation = useMutation({
    mutationFn: async (symptoms: string) => {
      const response = await fetch("/api/triage", {
        method: "POST",
        body: JSON.stringify({ symptoms }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        throw new Error("Failed to get triage response");
      }
      
      return response.json() as Promise<TriageResponse>;
    },
    onSuccess: (data, symptoms) => {
      const firstAidText = data.first_aid?.join("\n• ") || "No specific first aid recommended";
      const flagsText = data.medical_flags?.length > 0
        ? `\n\nMedical Flags: ${data.medical_flags.join(", ")}`
        : "";

      const aiResponse: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: `${data.summary_for_rescue_en}\n\nFirst Aid:\n• ${firstAidText}${flagsText}`,
        timestamp: new Date(),
        urgencyScore: data.urgency_score,
        medicalFlags: data.medical_flags,
        firstAid: data.first_aid,
      };
      setMessages((prev) => [...prev, aiResponse]);
    },
    onError: () => {
      const errorResponse: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: "I apologize, but I'm having trouble analyzing your symptoms right now. If this is an emergency, please call your local emergency number immediately (999).",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    onSendMessage?.(input);
    const symptoms = input;
    setInput("");

    triageMutation.mutate(symptoms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <Card className="h-full flex flex-col" data-testid="card-ai-chat">
      <CardHeader className="flex-shrink-0 border-b space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          AI Medical Assistant
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Powered by Google Gemini AI
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 px-4 py-3">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  Start Your Health Consultation
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Describe your symptoms and I'll provide instant medical triage and first aid guidance
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "ai" && (
                  <div className="mt-1 h-7 w-7 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                    <Brain className="h-4 w-4 text-purple-500" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3.5 py-2.5 max-w-[85%]",
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-muted border text-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.urgencyScore !== undefined && (
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <Badge 
                        variant={msg.urgencyScore >= 7 ? "destructive" : "secondary"} 
                        className="text-xs"
                      >
                        Urgency: {msg.urgencyScore}/10
                      </Badge>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="mt-1 h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {triageMutation.isPending && (
              <div className="flex gap-2.5">
                <div className="mt-1 h-7 w-7 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                  <Brain className="h-4 w-4 text-purple-500" />
                </div>
                <div className="bg-muted border rounded-lg px-3.5 py-2.5 flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-500" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 p-4 border-t bg-muted/30">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms..."
              disabled={triageMutation.isPending}
              className="flex-1"
              data-testid="input-symptoms"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0"
              disabled={triageMutation.isPending || !input.trim()}
              data-testid="button-send-message"
            >
              {triageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
