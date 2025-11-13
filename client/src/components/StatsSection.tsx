import { Users, Clock, MapPin, TrendingUp } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { 
      icon: Users, 
      label: "Lives Saved", 
      value: "10,000+", 
      description: "Through AI triage and rapid response"
    },
    { 
      icon: Clock, 
      label: "Avg Response Time", 
      value: "< 3 min", 
      description: "From alert to emergency dispatch"
    },
    { 
      icon: MapPin, 
      label: "Active Hospitals", 
      value: "500+", 
      description: "Connected to our network"
    },
    { 
      icon: TrendingUp, 
      label: "AI Accuracy", 
      value: "98.5%", 
      description: "Medical triage precision"
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Operational Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time metrics that demonstrate our impact on emergency healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="relative group flex"
              data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col w-full">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 mb-4 self-start">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div 
                  className="text-5xl font-bold mb-2 text-white" 
                  data-testid={`text-stat-value-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
