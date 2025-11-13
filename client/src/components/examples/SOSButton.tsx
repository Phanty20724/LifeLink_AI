import SOSButton from "../SOSButton";

export default function SOSButtonExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Default size:</p>
        <SOSButton onActivate={(loc) => console.log("SOS activated at:", loc)} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Large size (for SOS page):</p>
        <SOSButton
          size="large"
          onActivate={(loc) => console.log("SOS activated at:", loc)}
        />
      </div>
    </div>
  );
}
