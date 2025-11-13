import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Alert {
  id: string;
  location: { lat: number; lng: number };
  status: "active" | "pending" | "resolved";
  user: string;
  urgency: number;
  timestamp: Date;
}

interface AlertMapProps {
  alerts: Alert[];
  onAlertClick?: (alert: Alert) => void;
}

const customIcon = L.divIcon({
  html: `<div style="background: hsl(348, 83%, 57%); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const resolvedIcon = L.divIcon({
  html: `<div style="background: hsl(142, 71%, 45%); width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function AlertMap({ alerts, onAlertClick }: AlertMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const defaultCenter: [number, number] = alerts.length > 0
        ? [alerts[0].location.lat, alerts[0].location.lng]
        : [23.8103, 90.4125];

      mapRef.current = L.map(mapContainerRef.current).setView(defaultCenter, 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    alerts.forEach((alert) => {
      const marker = L.marker([alert.location.lat, alert.location.lng], {
        icon: alert.status === "resolved" ? resolvedIcon : customIcon,
      }).addTo(map);

      const statusColor = {
        active: "hsl(348, 83%, 57%)",
        pending: "hsl(38, 92%, 50%)",
        resolved: "hsl(142, 71%, 45%)",
      }[alert.status];

      marker.bindPopup(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600;">${alert.user}</h3>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 14px;">
            <div>
              <strong>Status:</strong>
              <span style="margin-left: 4px; padding: 2px 8px; background: ${statusColor}; color: white; border-radius: 4px; font-size: 12px;">
                ${alert.status}
              </span>
            </div>
            <div><strong>Urgency:</strong> ${alert.urgency}/10</div>
            <div><strong>Time:</strong> ${alert.timestamp.toLocaleTimeString()}</div>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onAlertClick?.(alert);
      });
    });

    if (alerts.length > 0) {
      const bounds = L.latLngBounds(
        alerts.map((a) => [a.location.lat, a.location.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [alerts, onAlertClick]);

  return (
    <div className="relative h-full w-full rounded-md overflow-hidden border">
      <div ref={mapContainerRef} className="h-full w-full" data-testid="map-container" />
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
}
