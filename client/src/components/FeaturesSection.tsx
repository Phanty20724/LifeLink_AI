import { Brain, Wifi, MapPin, Radio, Shield, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Doctor",
      description: "Google Gemini AI provides instant medical triage, symptom analysis, and first-aid guidance in multiple languages.",
    },
    {
      icon: Wifi,
      title: "Offline-Capable SOS",
      description: "Emergency alerts work offline and sync when connected. Never miss a critical moment, even without internet.",
    },
    {
      icon: MapPin,
      title: "Live Emergency Routing",
      description: "Real-time mapping routes emergencies to nearest hospitals, police stations, and emergency responders.",
    },
    {
      icon: Radio,
      title: "Emergency Network",
      description: "Direct connection to hospitals, police stations, and emergency services for coordinated response.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security and privacy compliance for all medical data and patient information.",
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Cloud synchronization ensures all data is backed up and accessible across devices instantly.",
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Complete Emergency Healthcare Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to save lives, from AI triage to emergency response coordination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 mb-6">
                <feature.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
