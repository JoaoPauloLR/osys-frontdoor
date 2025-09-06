import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Search, 
  Eye, 
  Edit, 
  FileText,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdensServico = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("cliente");
  const [statusFilter, setStatusFilter] = useState("todas");

  // Dados mock das OS
  const ordensServico = [
    {
      id: 1001,
      cliente: "João Silva",
      aparelho: "Smartphone Samsung",
      dataEntrada: "2025-01-15",
      status: "Em aberto",
      statusColor: "warning" as const,
    },
    {
      id: 1002,
      cliente: "Maria Santos", 
      aparelho: "Notebook Dell",
      dataEntrada: "2025-01-14",
      status: "Aguardando aprovação",
      statusColor: "destructive" as const,
    },
    {
      id: 1003,
      cliente: "Pedro Oliveira",
      aparelho: "Tablet Apple",
      dataEntrada: "2025-01-13",
      status: "Finalizada",
      statusColor: "default" as const,
    },
  ];

  const filteredOS = ordensServico.filter(os => {
    const searchValue = searchTerm.toLowerCase();
    let matchesSearch = false;
    
    switch (searchFilter) {
      case "cliente":
        matchesSearch = os.cliente.toLowerCase().includes(searchValue);
        break;
      case "numero":
        matchesSearch = os.id.toString().includes(searchValue);
        break;
      case "dataEntrada":
        matchesSearch = os.dataEntrada.includes(searchValue);
        break;
      default:
        matchesSearch = true;
    }

    const matchesStatus = statusFilter === "todas" || 
      (statusFilter === "abertas" && os.status !== "Finalizada") ||
      (statusFilter === "fechadas" && os.status === "Finalizada");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark flex items-center gap-3">
            <FileText className="h-8 w-8 text-corporate-blue" />
            Gerenciamento de Ordens de Serviço
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as ordens de serviço do sistema
          </p>
        </div>
        <Button 
          variant="corporate" 
          size="lg"
          onClick={() => navigate("/ordens-servico/nova")}
          className="gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Criar Nova Ordem de Serviço
        </Button>
      </div>

      {/* Advanced Search Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Busca Avançada</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar ordens de serviço específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Digite o termo de busca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11"
                />
              </div>
              <Select value={searchFilter} onValueChange={setSearchFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Nome do Cliente</SelectItem>
                  <SelectItem value="numero">Nº da OS</SelectItem>
                  <SelectItem value="dataEntrada">Data de Entrada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="abertas">Abertas</SelectItem>
                  <SelectItem value="fechadas">Fechadas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="corporate" size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            Resultados da Busca ({filteredOS.length} ordens de serviço)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº da OS</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Aparelho</TableHead>
                  <TableHead>Data de Entrada</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOS.map((os) => (
                  <TableRow key={os.id} className="hover:bg-neutral-light/50">
                    <TableCell className="font-medium">#{os.id}</TableCell>
                    <TableCell>{os.cliente}</TableCell>
                    <TableCell>{os.aparelho}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(os.dataEntrada).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={os.statusColor}>{os.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ordens-servico/${os.id}`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/ordens-servico/${os.id}/editar`)}
                          className="gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOS.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhuma ordem de serviço encontrada com os critérios de busca.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdensServico;