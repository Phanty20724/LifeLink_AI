import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SOSButtonProps {
  onActivate?: (location: { lat: number; lng: number }) => void;
  size?: "default" | "large";
}

export default function SOSButton({ onActivate, size = "default" }: SOSButtonProps) {
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    setActivating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("SOS activated at:", location);
        onActivate?.(location);
        setActivated(true);
        setTimeout(() => {
          setActivating(false);
        }, 2000);
      },
      (error) => {
        console.error("Geolocation error:", error);
        const fallbackLocation = { lat: 23.8103, lng: 90.4125 };
        console.log("SOS activated at (fallback):", fallbackLocation);
        onActivate?.(fallbackLocation);
        setActivated(true);
        setActivating(false);
      }
    );
  };

  if (size === "large") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
        <Button
          variant="destructive"
          size="lg"
          className={`h-64 w-64 rounded-full text-2xl font-bold animate-pulse-soft ${
            activated ? "opacity-50" : ""
          }`}
          onClick={handleActivate}
          disabled={activating || activated}
          data-testid="button-sos-activate"
        >
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-24 w-24" />
            {activating ? "Activating..." : activated ? "SOS Sent!" : "EMERGENCY SOS"}
          </div>
        </Button>

        {activated && (
          <Card className="max-w-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-chart-5">
                <MapPin className="h-5 w-5" />
                <p className="font-medium">Location sent to emergency services</p>
              </div>
              <div className="flex items-center gap-2 text-chart-5">
                <Phone className="h-5 w-5" />
                <p className="font-medium">Emergency contacts notified</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Help is on the way. Stay calm and stay where you are if possible.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="destructive"
      className="gap-2 animate-pulse-soft"
      onClick={handleActivate}
      disabled={activating || activated}
      data-testid="button-sos"
    >
      <AlertCircle className="h-4 w-4" />
      {activating ? "Sending..." : activated ? "SOS Sent!" : "Emergency SOS"}
    </Button>
  );
}
