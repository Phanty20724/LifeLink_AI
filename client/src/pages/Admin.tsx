import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import AlertMap from "@/components/AlertMap";
import AlertList from "@/components/AlertList";
import type { Alert } from "@shared/schema";

interface AlertWithUser extends Alert {
  user: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, logout } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    } else if (user.role !== "admin") {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
    enabled: !!user && user.role === "admin",
    refetchInterval: 5000,
  });

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest(`/api/alerts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleAccept = (alertId: string) => {
    updateAlertMutation.mutate({ id: alertId, status: "active" });
    toast({
      title: "Alert accepted",
      description: "Emergency response activated",
    });
  };

  const handleResolve = (alertId: string) => {
    updateAlertMutation.mutate({ id: alertId, status: "resolved" });
    toast({
      title: "Alert resolved",
      description: "Emergency has been resolved",
    });
  };

  if (!user || user.role !== "admin") return null;

  const alertsWithUser: AlertWithUser[] = alerts.map((alert) => ({
    ...alert,
    user: alert.userId,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Emergency Control Center</h1>
          <p className="text-muted-foreground">Real-time monitoring of emergency alerts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          <div className="lg:col-span-2 h-full">
            <AlertMap
              alerts={alertsWithUser}
              onAlertClick={(alert) => console.log("Alert clicked:", alert)}
            />
          </div>

          <div className="lg:col-span-1 h-full">
            <AlertList
              alerts={alertsWithUser}
              onAlertClick={(alert) => console.log("Alert clicked:", alert)}
              onAccept={handleAccept}
              onResolve={handleResolve}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
