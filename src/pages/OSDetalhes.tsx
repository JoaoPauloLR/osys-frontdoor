import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  FileText, 
  Users, 
  Smartphone,
  Calendar,
  Wrench,
  DollarSign,
  Package,
  MessageSquare,
  Printer
} from "lucide-react";

const OSDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dados mock da OS
  const ordemServico = {
    id: 1001,
    cliente: {
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123, Centro, São Paulo",
    },
    aparelho: {
      nome: "Smartphone Samsung",
      marca: "Samsung",
      modelo: "Galaxy S21",
      numeroSerie: "SM123456789",
      defeitoRelatado: "Tela quebrada após queda. Cliente relatou que o touch não está funcionando em algumas áreas da tela.",
    },
    servico: {
      descricao: "Substituição completa da tela touch. Verificação e teste de todas as funcionalidades do aparelho.",
      pecasUtilizadas: "Tela touch original Samsung Galaxy S21\nPelícula protetora premium",
      valorPecas: 250.00,
      valorServico: 150.00,
      desconto: 0.00,
      total: 400.00,
    },
    datas: {
      entrada: "2025-01-15",
      saida: "",
    },
    observacoes: "Cliente aguardando contato para aprovação do orçamento. Aparelho sem outros danos visíveis.",
    status: "Em aberto",
    statusColor: "warning" as const,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              Detalhes da OS Nº {ordemServico.id}
            </h1>
            <p className="text-muted-foreground mt-1">
              Informações completas da ordem de serviço
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Gerar Impressão
          </Button>
          <Button
            variant="corporate"
            onClick={() => navigate(`/ordens-servico/${id}/editar`)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar OS
          </Button>
        </div>
      </div>

      {/* Status da OS */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Status Atual</h3>
              <p className="text-sm text-muted-foreground">
                OS criada em {new Date(ordemServico.datas.entrada).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <Badge variant={ordemServico.statusColor} className="text-sm px-3 py-1">
              {ordemServico.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Dados do Cliente */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-corporate-blue" />
            Dados do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nome Completo</p>
              <p className="font-medium">{ordemServico.cliente.nome}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{ordemServico.cliente.telefone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="font-medium">{ordemServico.cliente.endereco}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Aparelho */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-corporate-blue" />
            Informações do Aparelho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Nome do Aparelho</p>
                <p className="font-medium">{ordemServico.aparelho.nome}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Marca</p>
                <p className="font-medium">{ordemServico.aparelho.marca}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modelo</p>
                <p className="font-medium">{ordemServico.aparelho.modelo}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Número de Série</p>
                <p className="font-medium">{ordemServico.aparelho.numeroSerie}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Defeito Relatado</p>
                <p className="font-medium">{ordemServico.aparelho.defeitoRelatado}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Serviço */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wrench className="h-5 w-5 text-corporate-blue" />
            Detalhes do Serviço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Descrição do Serviço Prestado</p>
              <p className="font-medium">{ordemServico.servico.descricao}</p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Peças Utilizadas
              </p>
              <div className="bg-neutral-light/30 p-3 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-medium">
                  {ordemServico.servico.pecasUtilizadas}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valores */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-corporate-blue" />
            Valores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-light/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Valor das Peças</p>
                <p className="text-xl font-bold">R$ {ordemServico.servico.valorPecas.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="bg-neutral-light/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Valor do Serviço</p>
                <p className="text-xl font-bold">R$ {ordemServico.servico.valorServico.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="bg-neutral-light/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Desconto</p>
                <p className="text-xl font-bold text-error-red">
                  - R$ {ordemServico.servico.desconto.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-corporate-blue/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total da OS</p>
              <p className="text-3xl font-bold text-corporate-blue">
                R$ {ordemServico.servico.total.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datas e Observações */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-corporate-blue" />
            Informações Complementares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-corporate-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Data de Entrada</p>
                  <p className="font-medium">
                    {new Date(ordemServico.datas.entrada).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-corporate-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Data de Saída</p>
                  <p className="font-medium">
                    {ordemServico.datas.saida 
                      ? new Date(ordemServico.datas.saida).toLocaleDateString('pt-BR')
                      : "Não finalizada"
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {ordemServico.observacoes && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Observações</p>
                  <div className="bg-neutral-light/30 p-3 rounded-lg">
                    <p className="text-sm">{ordemServico.observacoes}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSDetalhes;