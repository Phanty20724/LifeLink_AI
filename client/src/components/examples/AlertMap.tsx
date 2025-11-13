import AlertMap from "../AlertMap";

export default function AlertMapExample() {
  const sampleAlerts = [
    {
      id: "1",
      location: { lat: 23.8103, lng: 90.4125 },
      status: "active" as const,
      user: "John Doe",
      urgency: 8,
      timestamp: new Date(),
    },
    {
      id: "2",
      location: { lat: 23.7805, lng: 90.4200 },
      status: "pending" as const,
      user: "Jane Smith",
      urgency: 6,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "3",
      location: { lat: 23.8200, lng: 90.3950 },
      status: "resolved" as const,
      user: "Bob Johnson",
      urgency: 4,
      timestamp: new Date(Date.now() - 600000),
    },
  ];

  return (
    <div className="h-[600px] w-full p-6">
      <AlertMap
        alerts={sampleAlerts}
        onAlertClick={(alert) => console.log("Alert clicked:", alert)}
      />
    </div>
  );
}
