import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Clock, MapPin, User } from "lucide-react";

interface Alert {
  id: string;
  location: { lat: number; lng: number };
  status: "active" | "pending" | "resolved";
  user: string;
  urgency: number;
  timestamp: Date;
  description?: string;
}

interface AlertListProps {
  alerts: Alert[];
  onAlertClick?: (alert: Alert) => void;
  onAccept?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
}

export default function AlertList({ alerts, onAlertClick, onAccept, onResolve }: AlertListProps) {
  const statusConfig = {
    active: { color: "bg-chart-3 text-white", label: "Active" },
    pending: { color: "bg-chart-4 text-white", label: "Pending" },
    resolved: { color: "bg-chart-5 text-white", label: "Resolved" },
  };

  const urgencyColor = (urgency: number) => {
    if (urgency >= 8) return "border-chart-3";
    if (urgency >= 5) return "border-chart-4";
    return "border-chart-5";
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Live Alerts</span>
          <Badge variant="outline" data-testid="badge-alert-count">
            {alerts.filter((a) => a.status === "active").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No emergency alerts at the moment</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${urgencyColor(alert.urgency)} hover-elevate cursor-pointer`}
                  onClick={() => onAlertClick?.(alert)}
                  data-testid={`card-alert-${alert.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{alert.user}</span>
                      </div>
                      <Badge className={statusConfig[alert.status].color}>
                        {statusConfig[alert.status].label}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <AlertCircle className="h-3 w-3" />
                        <span>Urgency: {alert.urgency}/10</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="font-mono text-xs">
                          {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp.toLocaleString()}</span>
                      </div>
                      {alert.description && (
                        <p className="text-muted-foreground mt-2">{alert.description}</p>
                      )}
                    </div>

                    {alert.status === "pending" && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAccept?.(alert.id);
                          }}
                          data-testid={`button-accept-${alert.id}`}
                        >
                          Accept
                        </Button>
                      </div>
                    )}

                    {alert.status === "active" && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onResolve?.(alert.id);
                          }}
                          data-testid={`button-resolve-${alert.id}`}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
