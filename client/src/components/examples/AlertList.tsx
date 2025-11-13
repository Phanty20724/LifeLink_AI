import AlertList from "../AlertList";

export default function AlertListExample() {
  const sampleAlerts = [
    {
      id: "1",
      location: { lat: 23.8103, lng: 90.4125 },
      status: "active" as const,
      user: "John Doe",
      urgency: 9,
      timestamp: new Date(),
      description: "Severe chest pain, difficulty breathing",
    },
    {
      id: "2",
      location: { lat: 23.7805, lng: 90.4200 },
      status: "pending" as const,
      user: "Jane Smith",
      urgency: 6,
      timestamp: new Date(Date.now() - 300000),
      description: "High fever and persistent headache",
    },
    {
      id: "3",
      location: { lat: 23.8200, lng: 90.3950 },
      status: "resolved" as const,
      user: "Bob Johnson",
      urgency: 4,
      timestamp: new Date(Date.now() - 600000),
      description: "Minor cut, bleeding controlled",
    },
  ];

  return (
    <div className="h-[600px] p-6">
      <AlertList
        alerts={sampleAlerts}
        onAlertClick={(alert) => console.log("Alert clicked:", alert)}
        onAccept={(id) => console.log("Accepted:", id)}
        onResolve={(id) => console.log("Resolved:", id)}
      />
    </div>
  );
}
