
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import AIChat from "@/components/AIChat";
import { Heart, Activity, Thermometer, Droplets, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { HealthLog } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: healthLogs, isLoading } = useQuery<HealthLog[]>({
    queryKey: ["/api/health-logs", user?.id],
    enabled: !!user,
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  if (!user) return null;

  const latestLog = healthLogs?.[0];

  const vitals = [
    {
      label: "Heart Rate",
      value: latestLog?.heartRate?.toString() || "--",
      unit: "bpm",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      label: "Blood Pressure",
      value:
        latestLog?.bloodPressureSystolic && latestLog?.bloodPressureDiastolic
          ? `${latestLog.bloodPressureSystolic}/${latestLog.bloodPressureDiastolic}`
          : "--",
      unit: "mmHg",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Temperature",
      value: latestLog?.temperature?.toString() || "--",
      unit: "°F",
      icon: Thermometer,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      label: "Oxygen",
      value: latestLog?.oxygenLevel?.toString() || "--",
      unit: "%",
      icon: Droplets,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.name}
            </h1>
            <Badge variant="outline" className="gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live Monitoring
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Your AI-powered health companion is ready
          </p>
        </motion.div>

        {/* Compact Vitals Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vitals.map((vital) => {
                const Icon = vital.icon;
                return (
                  <Card
                    key={vital.label}
                    className={`border ${vital.borderColor} ${vital.bgColor} backdrop-blur-sm hover-elevate`}
                    data-testid={`card-vital-${vital.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${vital.color} bg-opacity-20`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground font-medium">
                          {vital.label}
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-foreground">
                            {vital.value}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {vital.unit}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* AI Chat - Large Focus Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                AI Doctor Chat
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Describe your symptoms for instant AI triage
              </p>
            </div>
            <div className="h-[calc(100vh-400px)] min-h-[500px]">
              <AIChat />
            </div>
          </motion.div>

          {/* Recent Activity - Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Recent Activity
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your health timeline
              </p>
            </div>
            <Card className="h-[calc(100vh-400px)] min-h-[500px] flex flex-col" data-testid="card-recent-activity">
              <CardContent className="flex-1 overflow-auto p-4">
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : healthLogs && healthLogs.length > 0 ? (
                  <div className="space-y-2">
                    {healthLogs.map((log, index) => (
                      <div
                        key={log.id}
                        className="group p-3 rounded-lg border hover-elevate transition-all"
                        data-testid={`activity-log-${index}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {log.symptoms || "Vitals check"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(log.timestamp).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {log.heartRate && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  <Heart className="h-2.5 w-2.5 mr-1" />
                                  {log.heartRate}
                                </Badge>
                              )}
                              {log.temperature && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  <Thermometer className="h-2.5 w-2.5 mr-1" />
                                  {log.temperature}°
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No activity yet</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                      Start chatting with the AI doctor to build your health timeline
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
