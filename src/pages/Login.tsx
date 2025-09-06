import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Settings, Shield } from "lucide-react";

const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    if (login.trim() && senha.trim()) {
      setTimeout(() => {
        localStorage.setItem("osys-user", JSON.stringify({ login, name: "Usuário Demo" }));
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao Sistema OSys!",
        });
        navigate("/dashboard");
      }, 1000);
    } else {
      setIsLoading(false);
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha inválidos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-primary p-3 rounded-xl shadow-lg">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-corporate-blue">OSys</h1>
          </div>
          <p className="text-muted-foreground">Sistema de Gerenciamento de Ordens de Serviço</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-neutral-dark flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Acesso ao Sistema
            </CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o OSys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} method="POST" action="/login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login" className="text-neutral-dark font-medium">
                  Usuário
                </Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-neutral-dark font-medium">
                  Senha
                </Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="corporate" 
                size="lg" 
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Demo credentials info */}
            <div className="mt-6 p-4 bg-neutral-light rounded-lg border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo:</strong> Use qualquer usuário e senha não vazios
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          © 2025 CoreInfo - Sistema OSys
        </footer>
      </div>
    </div>
  );
};

export default Login;