import AIChat from "../AIChat";

export default function AIChatExample() {
  const sampleMessages = [
    {
      id: "1",
      role: "user" as const,
      content: "I have a severe headache and slight fever",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      role: "ai" as const,
      content: "Based on your symptoms, this could be related to common conditions. I recommend:\n\n1. Rest and stay hydrated\n2. Take over-the-counter pain relief\n3. Monitor your temperature\n\nSeek immediate care if fever exceeds 103°F or symptoms worsen.",
      timestamp: new Date(Date.now() - 240000),
      urgencyScore: 4,
    },
  ];

  return (
    <div className="p-6">
      <AIChat
        messages={sampleMessages}
        onSendMessage={(msg) => console.log("Message sent:", msg)}
      />
    </div>
  );
}
