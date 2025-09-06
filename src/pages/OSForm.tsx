import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, FileText, Calculator, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OSForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const isEditing = !!id;
  const clientePreSelecionado = searchParams.get('cliente');

  const [formData, setFormData] = useState({
    clienteId: clientePreSelecionado || "",
    nomeAparelho: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    defeitoRelatado: "",
    descricaoServico: "",
    pecasUtilizadas: "",
    valorPecas: "",
    valorServico: "",
    desconto: "",
    dataEntrada: new Date().toISOString().split('T')[0],
    dataSaida: "",
    observacoes: "",
  });

  // Lista mock de clientes
  const clientes = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Maria Santos" },
    { id: "3", nome: "Pedro Oliveira" },
  ];

  useEffect(() => {
    if (isEditing) {
      // Simular carregamento dos dados da OS
      const mockOS = {
        clienteId: "1",
        nomeAparelho: "Smartphone Samsung",
        marca: "Samsung",
        modelo: "Galaxy S21",
        numeroSerie: "SM123456789",
        defeitoRelatado: "Tela quebrada",
        descricaoServico: "Substituição da tela touch",
        pecasUtilizadas: "Tela touch original Samsung",
        valorPecas: "250.00",
        valorServico: "150.00",
        desconto: "0.00",
        dataEntrada: "2025-01-15",
        dataSaida: "",
        observacoes: "Cliente aguardando contato para aprovação",
      };
      setFormData(mockOS);
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularTotal = () => {
    const pecas = parseFloat(formData.valorPecas) || 0;
    const servico = parseFloat(formData.valorServico) || 0;
    const desconto = parseFloat(formData.desconto) || 0;
    return pecas + servico - desconto;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.clienteId || !formData.nomeAparelho || !formData.defeitoRelatado || !formData.valorPecas || !formData.valorServico) {
      toast({
        title: "Erro de validação",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    const clienteNome = clientes.find(c => c.id === formData.clienteId)?.nome;
    toast({
      title: isEditing ? "OS atualizada!" : "OS criada!",
      description: `Ordem de serviço para ${clienteNome} foi ${isEditing ? 'atualizada' : 'criada'} com sucesso.`,
    });

    navigate("/ordens-servico");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/ordens-servico")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark flex items-center gap-3">
            <FileText className="h-8 w-8 text-corporate-blue" />
            {isEditing ? `Editar OS Nº ${id}` : "Nova Ordem de Serviço"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Atualize as informações da ordem de serviço" : "Preencha os dados para criar uma nova ordem de serviço"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção 1: Cliente e Aparelho */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Cliente e Aparelho</CardTitle>
            <CardDescription>
              Selecione o cliente e informe os dados do aparelho
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clienteId">Cliente *</Label>
                <div className="flex gap-2">
                  <Select value={formData.clienteId} onValueChange={(value) => handleSelectChange('clienteId', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/clientes/novo")}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Novo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeAparelho">Nome do Aparelho *</Label>
                <Input
                  id="nomeAparelho"
                  name="nomeAparelho"
                  value={formData.nomeAparelho}
                  onChange={handleInputChange}
                  placeholder="Ex: Smartphone Samsung"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  placeholder="Ex: Samsung"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  placeholder="Ex: Galaxy S21"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroSerie">Nº de Série</Label>
                <Input
                  id="numeroSerie"
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleInputChange}
                  placeholder="Ex: SM123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defeitoRelatado">Defeito Relatado *</Label>
                <Textarea
                  id="defeitoRelatado"
                  name="defeitoRelatado"
                  value={formData.defeitoRelatado}
                  onChange={handleInputChange}
                  placeholder="Descreva o problema relatado pelo cliente"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Serviço e Valores */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Serviço e Valores</CardTitle>
            <CardDescription>
              Descreva o serviço prestado e informe os valores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="descricaoServico">Descrição do Serviço Prestado</Label>
                <Textarea
                  id="descricaoServico"
                  name="descricaoServico"
                  value={formData.descricaoServico}
                  onChange={handleInputChange}
                  placeholder="Descreva detalhadamente o serviço realizado"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pecasUtilizadas">Peças Utilizadas</Label>
                <Textarea
                  id="pecasUtilizadas"
                  name="pecasUtilizadas"
                  value={formData.pecasUtilizadas}
                  onChange={handleInputChange}
                  placeholder="Liste as peças utilizadas no reparo"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="valorPecas">Valor das Peças (R$) *</Label>
                  <Input
                    id="valorPecas"
                    name="valorPecas"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valorPecas}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorServico">Valor do Serviço (R$) *</Label>
                  <Input
                    id="valorServico"
                    name="valorServico"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valorServico}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desconto">Desconto (R$)</Label>
                  <Input
                    id="desconto"
                    name="desconto"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.desconto}
                    onChange={handleInputChange}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-neutral-light/30 rounded-lg">
                <Calculator className="h-5 w-5 text-corporate-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Total da OS</p>
                  <p className="text-xl font-bold text-corporate-blue">
                    R$ {calcularTotal().toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Datas e Observações */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Datas e Observações</CardTitle>
            <CardDescription>
              Informações complementares sobre a ordem de serviço
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dataEntrada">Data de Entrada</Label>
                <Input
                  id="dataEntrada"
                  name="dataEntrada"
                  type="date"
                  value={formData.dataEntrada}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataSaida">Data de Saída</Label>
                <Input
                  id="dataSaida"
                  name="dataSaida"
                  type="date"
                  value={formData.dataSaida}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Observações gerais sobre a ordem de serviço"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <Button type="submit" variant="corporate" size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            {isEditing ? "Atualizar OS" : "Criar Ordem de Serviço"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/ordens-servico")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OSForm;