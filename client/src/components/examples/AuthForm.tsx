import AuthForm from "../AuthForm";

export default function AuthFormExample() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Login Form:</p>
        <AuthForm mode="login" onSubmit={(data) => console.log("Login:", data)} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4 mt-8">Signup Form:</p>
        <AuthForm mode="signup" onSubmit={(data) => console.log("Signup:", data)} />
      </div>
    </div>
  );
}
