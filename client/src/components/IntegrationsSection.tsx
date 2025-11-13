import { Hospital, Shield, Radio, Users } from "lucide-react";

export default function IntegrationsSection() {
  const integrations = [
    {
      icon: Hospital,
      name: "Hospitals Network",
      description: "500+ hospitals connected",
      status: "Active",
    },
    {
      icon: Shield,
      name: "Police Stations",
      description: "Direct emergency dispatch",
      status: "Active",
    },
    {
      icon: Radio,
      name: "Emergency Services",
      description: "911/112 integration",
      status: "Active",
    },
    {
      icon: Users,
      name: "First Responders",
      description: "Paramedic coordination",
      status: "Active",
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Connected Emergency Network
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Integrated with hospitals, police stations, and emergency services for seamless coordination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                  <integration.icon className="h-6 w-6 text-purple-400" />
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                  {integration.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {integration.name}
              </h3>
              <p className="text-sm text-gray-400">
                {integration.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Trusted by emergency services worldwide • HIPAA & GDPR Compliant • ISO 27001 Certified
          </p>
        </div>
      </div>
    </div>
  );
}
