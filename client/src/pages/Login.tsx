import { useLocation } from "wouter";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  const [, setLocation] = useLocation();
  const { setUser } = useUser();
  const { toast } = useToast();

  const handleLogin = (data: { email: string; password: string }) => {
    const usersData = localStorage.getItem('lifelink_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const user = users.find((u: any) => u.email === data.email && u.password === data.password);
    
    if (user) {
      const userWithoutPassword = { ...user, password: undefined };
      setUser(userWithoutPassword);
      localStorage.setItem('lifelink_current_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
