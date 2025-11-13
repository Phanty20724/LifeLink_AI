import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  trend?: string;
}

export default function HealthMetricCard({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend,
}: HealthMetricCardProps) {
  const statusConfig = {
    normal: {
      border: "border-green-500/30",
      bg: "bg-gradient-to-br from-green-500/5 to-green-500/10",
      icon: "bg-green-500/20 text-green-400",
      glow: "shadow-green-500/20"
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-gradient-to-br from-amber-500/5 to-amber-500/10",
      icon: "bg-amber-500/20 text-amber-400",
      glow: "shadow-amber-500/20"
    },
    critical: {
      border: "border-red-500/30",
      bg: "bg-gradient-to-br from-red-500/5 to-red-500/10",
      icon: "bg-red-500/20 text-red-400",
      glow: "shadow-red-500/20"
    },
  };

  const config = statusConfig[status];

  return (
    <Card className={cn(
      "border backdrop-blur-sm transition-all hover:scale-[1.02]",
      config.border,
      config.bg,
      config.glow,
      "bg-gray-900/50 shadow-lg"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-3 rounded-xl", config.icon)}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {value}
            </span>
            <span className="text-gray-400 text-lg">{unit}</span>
          </div>
          {trend && (
            <p className="text-sm text-gray-500">{trend}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}