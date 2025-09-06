import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("nome");

  // Dados mock dos clientes
  const clientes = [
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      cidade: "São Paulo",
      endereco: "Rua das Flores, 123",
      bairro: "Centro",
    },
    {
      id: 2,
      nome: "Maria Santos",
      telefone: "(11) 91234-5678",
      cidade: "São Paulo",
      endereco: "Av. Paulista, 456",
      bairro: "Bela Vista",
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      telefone: "(11) 95555-1234",
      cidade: "Guarulhos",
      endereco: "Rua do Comércio, 789",
      bairro: "Vila Augusta",
    },
  ];

  const filteredClientes = clientes.filter(cliente => {
    const searchValue = searchTerm.toLowerCase();
    switch (searchFilter) {
      case "nome":
        return cliente.nome.toLowerCase().includes(searchValue);
      case "telefone":
        return cliente.telefone.includes(searchValue);
      case "endereco":
        return cliente.endereco.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark flex items-center gap-3">
            <Users className="h-8 w-8 text-corporate-blue" />
            Gerenciamento de Clientes
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os clientes cadastrados no sistema
          </p>
        </div>
        <Button 
          variant="corporate" 
          size="lg"
          onClick={() => navigate("/clientes/novo")}
          className="gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Cadastrar Novo Cliente
        </Button>
      </div>

      {/* Search Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Buscar Clientes</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar clientes específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1">
              <Input
                placeholder="Digite o termo de busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
            </div>
            <Select value={searchFilter} onValueChange={setSearchFilter}>
              <SelectTrigger className="w-full sm:w-48 h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nome">Nome</SelectItem>
                <SelectItem value="telefone">Telefone</SelectItem>
                <SelectItem value="endereco">Endereço</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="corporate" size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            Resultados da Busca ({filteredClientes.length} clientes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-neutral-light/50">
                    <TableCell className="font-medium">{cliente.nome}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>{cliente.cidade}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/clientes/${cliente.id}`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/clientes/${cliente.id}/editar`)}
                          className="gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => navigate(`/ordens-servico/nova?cliente=${cliente.id}`)}
                          className="gap-1"
                        >
                          <FileText className="h-3 w-3" />
                          Nova OS
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClientes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum cliente encontrado com os critérios de busca.
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

export default Clientes;