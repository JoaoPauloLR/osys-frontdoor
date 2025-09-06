import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    bairro: "",
    cidade: "",
    telefone: "",
  });

  useEffect(() => {
    if (isEditing) {
      // Simular carregamento dos dados do cliente
      const mockCliente = {
        nome: "João Silva",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        cidade: "São Paulo",
        telefone: "(11) 98765-4321",
      };
      setFormData(mockCliente);
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.cidade || !formData.telefone) {
      toast({
        title: "Erro de validação",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    toast({
      title: isEditing ? "Cliente atualizado!" : "Cliente cadastrado!",
      description: `${formData.nome} foi ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso.`,
    });

    navigate("/clientes");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
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
            {isEditing ? <Users className="h-8 w-8 text-corporate-blue" /> : <UserPlus className="h-8 w-8 text-corporate-blue" />}
            {isEditing ? `Editar Cliente` : "Cadastrar Novo Cliente"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Atualize as informações do cliente" : "Preencha os dados para cadastrar um novo cliente"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Dados do Cliente</CardTitle>
          <CardDescription>
            Campos marcados com * são obrigatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  type="text"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, Avenida, número"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  name="bairro"
                  type="text"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  placeholder="Nome do bairro"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Nome da cidade"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" variant="corporate" size="lg" className="gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/clientes")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteForm;