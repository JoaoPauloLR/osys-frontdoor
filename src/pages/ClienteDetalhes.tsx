import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Edit, 
  Users, 
  MapPin, 
  Phone, 
  FileText,
  Eye,
  Calendar
} from "lucide-react";

const ClienteDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dados mock do cliente
  const cliente = {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    bairro: "Centro",
    cidade: "São Paulo",
  };

  // Mock das OS do cliente
  const ordensServico = {
    abertas: [
      {
        id: 1001,
        dataEntrada: "2025-01-15",
        aparelho: "Smartphone Samsung",
        status: "Em aberto",
        statusColor: "warning" as const,
      },
    ],
    fechadas: [
      {
        id: 1000,
        dataEntrada: "2025-01-10",
        dataSaida: "2025-01-12",
        aparelho: "Notebook Dell",
        status: "Finalizada",
        statusColor: "default" as const,
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/clientes")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark flex items-center gap-3">
              <Users className="h-8 w-8 text-corporate-blue" />
              Detalhes de: {cliente.nome}
            </h1>
            <p className="text-muted-foreground mt-1">
              Informações completas do cliente e histórico de serviços
            </p>
          </div>
        </div>
        <Button
          variant="corporate"
          onClick={() => navigate(`/clientes/${id}/editar`)}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          Editar Cadastro
        </Button>
      </div>

      {/* Dados do Cliente */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-corporate-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Nome Completo</p>
                  <p className="font-medium">{cliente.nome}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-corporate-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{cliente.telefone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-corporate-blue mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Endereço Completo</p>
                  <p className="font-medium">
                    {cliente.endereco}<br />
                    {cliente.bairro}, {cliente.cidade}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ordens de Serviço Abertas */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Ordens de Serviço Abertas ({ordensServico.abertas.length})</CardTitle>
          <CardDescription>
            OS em andamento para este cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ordensServico.abertas.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº da OS</TableHead>
                    <TableHead>Data de Entrada</TableHead>
                    <TableHead>Aparelho</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordensServico.abertas.map((os) => (
                    <TableRow key={os.id}>
                      <TableCell className="font-medium">#{os.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(os.dataEntrada).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>{os.aparelho}</TableCell>
                      <TableCell>
                        <Badge variant={os.statusColor}>{os.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ordens-servico/${os.id}`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver OS
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Nenhuma ordem de serviço aberta para este cliente.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ordens de Serviço Fechadas */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Histórico de Ordens de Serviço ({ordensServico.fechadas.length})</CardTitle>
          <CardDescription>
            OS finalizadas para este cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ordensServico.fechadas.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº da OS</TableHead>
                    <TableHead>Data de Entrada</TableHead>
                    <TableHead>Data de Saída</TableHead>
                    <TableHead>Aparelho</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordensServico.fechadas.map((os) => (
                    <TableRow key={os.id}>
                      <TableCell className="font-medium">#{os.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(os.dataEntrada).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {os.dataSaida && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(os.dataSaida).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{os.aparelho}</TableCell>
                      <TableCell>
                        <Badge variant={os.statusColor}>{os.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ordens-servico/${os.id}`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver OS
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Nenhuma ordem de serviço finalizada para este cliente.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ação Rápida */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Criar Nova Ordem de Serviço</h3>
              <p className="text-sm text-muted-foreground">
                Crie uma nova OS para este cliente rapidamente
              </p>
            </div>
            <Button
              variant="success"
              onClick={() => navigate(`/ordens-servico/nova?cliente=${id}`)}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Nova OS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteDetalhes;