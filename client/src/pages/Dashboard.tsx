
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import HealthMetricCard from "@/components/HealthMetricCard";
import AIChat from "@/components/AIChat";
import { Heart, Activity, Thermometer, Droplets, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}</h1>
                <p className="text-gray-400">Monitor your health and get AI-powered insights</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vitals Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Your Vitals</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Live Monitoring</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-32 bg-gray-800" />
                    <Skeleton className="h-32 bg-gray-800" />
                    <Skeleton className="h-32 bg-gray-800" />
                    <Skeleton className="h-32 bg-gray-800" />
                  </>
                ) : (
                  <>
                    <HealthMetricCard
                      title="Heart Rate"
                      value={latestLog?.heartRate?.toString() || "--"}
                      unit="bpm"
                      icon={Heart}
                      status="normal"
                      trend={latestLog ? "Latest reading" : "No data"}
                    />
                    <HealthMetricCard
                      title="Blood Pressure"
                      value={
                        latestLog?.bloodPressureSystolic && latestLog?.bloodPressureDiastolic
                          ? `${latestLog.bloodPressureSystolic}/${latestLog.bloodPressureDiastolic}`
                          : "--"
                      }
                      unit="mmHg"
                      icon={Activity}
                      status="normal"
                      trend={latestLog ? "Latest reading" : "No data"}
                    />
                    <HealthMetricCard
                      title="Temperature"
                      value={latestLog?.temperature?.toString() || "--"}
                      unit="°F"
                      icon={Thermometer}
                      status="normal"
                      trend={latestLog ? "Latest reading" : "No data"}
                    />
                    <HealthMetricCard
                      title="Oxygen Level"
                      value={latestLog?.oxygenLevel?.toString() || "--"}
                      unit="%"
                      icon={Droplets}
                      status="normal"
                      trend={latestLog ? "Latest reading" : "No data"}
                    />
                  </>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    Health Log Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-8 bg-gray-800" />
                      <Skeleton className="h-8 bg-gray-800" />
                      <Skeleton className="h-8 bg-gray-800" />
                    </div>
                  ) : healthLogs && healthLogs.length > 0 ? (
                    <div className="space-y-4">
                      {healthLogs.slice(0, 5).map((log, index) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                              <TrendingUp className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {log.symptoms || "Vitals recorded"}
                              </p>
                              <p className="text-sm text-gray-400">
                                {new Date(log.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            #{healthLogs.length - index}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-3">
                        <Calendar className="h-8 w-8 text-gray-600" />
                      </div>
                      <p className="text-gray-400">No health logs yet</p>
                      <p className="text-sm text-gray-500 mt-1">Start logging your vitals to see your health timeline</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Chat - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">AI Doctor</h2>
              </div>
              <AIChat />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
