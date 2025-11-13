import Navbar from "../Navbar";

export default function NavbarExample() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Logged out state:</p>
        <Navbar />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Logged in (patient):</p>
        <Navbar
          user={{ name: "John Doe", role: "patient" }}
          onLogout={() => console.log("Logout clicked")}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Logged in (admin):</p>
        <Navbar
          user={{ name: "Dr. Smith", role: "admin" }}
          onLogout={() => console.log("Logout clicked")}
        />
      </div>
    </div>
  );
}
