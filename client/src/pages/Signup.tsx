import { useLocation } from "wouter";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "@/components/AuthForm";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { setUser } = useUser();
  const { toast } = useToast();

  const handleSignup = (data: { email: string; password: string; name?: string }) => {
    const usersData = localStorage.getItem('lifelink_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const existingUser = users.find((u: any) => u.email === data.email);
    
    if (existingUser) {
      toast({
        title: "Signup failed",
        description: "An account with this email already exists",
        variant: "destructive",
      });
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name || "User",
      role: "patient",
      location: null,
      createdAt: new Date()
    };
    
    users.push(newUser);
    localStorage.setItem('lifelink_users', JSON.stringify(users));
    
    const userWithoutPassword = { 
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      location: newUser.location,
      createdAt: newUser.createdAt,
      password: "" as any
    };
    setUser(userWithoutPassword);
    localStorage.setItem('lifelink_current_user', JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Account created",
      description: "Welcome to LifeLink AI!",
    });
    setLocation("/dashboard");
  };

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}
