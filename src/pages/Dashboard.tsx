import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  FileText, 
  BarChart3, 
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const quickAccessCards = [
    {
      title: "Gerenciar Clientes",
      description: "Cadastre, consulte e edite clientes",
      icon: Users,
      action: () => navigate("/clientes"),
      color: "corporate",
    },
    {
      title: "Gerenciar Ordens de Serviço",
      description: "Crie e acompanhe as ordens de serviço",
      icon: FileText,
      action: () => navigate("/ordens-servico"),
      color: "success",
    },
    {
      title: "Relatórios Financeiros",
      description: "Gere relatórios de desempenho e faturamento",
      icon: BarChart3,
      action: () => navigate("/relatorios"),
      color: "warning",
    },
  ] as const;

  const stats = [
    {
      title: "OS Abertas",
      value: "24",
      icon: Clock,
      description: "Aguardando atendimento",
      color: "text-warning-yellow",
    },
    {
      title: "OS Finalizadas",
      value: "156",
      icon: CheckCircle,
      description: "Este mês",
      color: "text-success-green",
    },
    {
      title: "Clientes Ativos",
      value: "89",
      icon: Users,
      description: "Cadastrados no sistema",
      color: "text-corporate-blue",
    },
    {
      title: "Faturamento",
      value: "R$ 45.320",
      icon: TrendingUp,
      description: "Este mês",
      color: "text-success-green",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">Painel Principal</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao Sistema de Gerenciamento de Ordens de Serviço
          </p>
        </div>
        <Button 
          variant="corporate" 
          size="lg"
          onClick={() => navigate("/ordens-servico/nova")}
          className="gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Nova OS
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-neutral-dark">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-dark mb-6">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessCards.map((card, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group"
              onClick={card.action}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-fit">
                  <card.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-neutral-dark group-hover:text-corporate-blue transition-colors">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant={card.color} 
                  size="lg" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    card.action();
                  }}
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;