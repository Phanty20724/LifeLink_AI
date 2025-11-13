import HealthMetricCard from "../HealthMetricCard";
import { Heart, Activity, Thermometer, Droplets } from "lucide-react";

export default function HealthMetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <HealthMetricCard
        title="Heart Rate"
        value="72"
        unit="bpm"
        icon={Heart}
        status="normal"
        trend="↑ 2% from yesterday"
      />
      <HealthMetricCard
        title="Blood Pressure"
        value="135/85"
        unit="mmHg"
        icon={Activity}
        status="warning"
        trend="↑ Higher than usual"
      />
      <HealthMetricCard
        title="Temperature"
        value="98.6"
        unit="°F"
        icon={Thermometer}
        status="normal"
        trend="Normal range"
      />
      <HealthMetricCard
        title="Oxygen Level"
        value="95"
        unit="%"
        icon={Droplets}
        status="critical"
        trend="↓ Below normal"
      />
    </div>
  );
}
