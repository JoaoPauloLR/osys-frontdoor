import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Calendar, 
  Download, 
  FileText, 
  DollarSign,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

const Relatorios = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [showReport, setShowReport] = useState(false);

  const [metricas, setMetricas] = useState({
    gastosPecas: true,
    ganhosServicos: true,
    totalDescontos: true,
    clientesAtendidos: true,
    osAbertas: true,
    osFechadas: true,
  });

  const handleMetricaChange = (metrica: keyof typeof metricas) => {
    setMetricas(prev => ({
      ...prev,
      [metrica]: !prev[metrica]
    }));
  };

  const gerarRelatorio = () => {
    if (!dataInicio || !dataFim) {
      alert("Por favor, selecione o período da consulta");
      return;
    }
    setShowReport(true);
  };

  // Dados mock do relatório
  const dadosRelatorio = {
    gastosPecas: "R$ 12.450,00",
    ganhosServicos: "R$ 45.320,00",
    totalDescontos: "R$ 2.150,00",
    clientesAtendidos: "89",
    osAbertas: "24",
    osFechadas: "156",
  };

  const metricasInfo = [
    { key: "gastosPecas", label: "Gasto com peças", icon: DollarSign, color: "text-error-red" },
    { key: "ganhosServicos", label: "Ganhos com serviços", icon: TrendingUp, color: "text-success-green" },
    { key: "totalDescontos", label: "Total de descontos", icon: DollarSign, color: "text-warning-yellow" },
    { key: "clientesAtendidos", label: "Total de clientes atendidos", icon: Users, color: "text-corporate-blue" },
    { key: "osAbertas", label: "Total de OS abertas", icon: Clock, color: "text-warning-yellow" },
    { key: "osFechadas", label: "Total de OS fechadas", icon: FileText, color: "text-success-green" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-corporate-blue" />
            Relatório Financeiro
          </h1>
          <p className="text-muted-foreground mt-1">
            Gere relatórios detalhados de desempenho e faturamento
          </p>
        </div>
      </div>

      {!showReport ? (
        /* Report Configuration */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Period Selection */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Período da Consulta
              </CardTitle>
              <CardDescription>
                Selecione o período para o qual deseja gerar o relatório
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Input
                    id="dataInicio"
                    name="dataInicio"
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Fim</Label>
                  <Input
                    id="dataFim"
                    name="dataFim"
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Selection */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Dados a Incluir</CardTitle>
              <CardDescription>
                Selecione as métricas que deseja incluir no relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metricasInfo.map((metrica) => (
                  <div key={metrica.key} className="flex items-center space-x-3">
                    <Checkbox
                      id={metrica.key}
                      checked={metricas[metrica.key as keyof typeof metricas]}
                      onCheckedChange={() => handleMetricaChange(metrica.key as keyof typeof metricas)}
                    />
                    <div className="flex items-center gap-2">
                      <metrica.icon className={`h-4 w-4 ${metrica.color}`} />
                      <label
                        htmlFor={metrica.key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {metrica.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="lg:col-span-2 flex justify-center">
            <Button 
              variant="corporate" 
              size="lg" 
              onClick={gerarRelatorio}
              className="gap-2 px-8"
            >
              <BarChart3 className="h-5 w-5" />
              Gerar Relatório
            </Button>
          </div>
        </div>
      ) : (
        /* Report Results */
        <div className="space-y-6">
          {/* Report Header */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    Relatório Financeiro para o período: {new Date(dataInicio).toLocaleDateString('pt-BR')} a {new Date(dataFim).toLocaleDateString('pt-BR')}
                  </CardTitle>
                  <CardDescription>
                    Relatório gerado em {new Date().toLocaleString('pt-BR')}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowReport(false)}>
                    Nova Consulta
                  </Button>
                  <Button variant="success" className="gap-2">
                    <Download className="h-4 w-4" />
                    Gerar PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Report Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricasInfo.map((metrica) => {
              if (!metricas[metrica.key as keyof typeof metricas]) return null;
              
              return (
                <Card key={metrica.key} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metrica.label}</p>
                        <p className="text-2xl font-bold text-neutral-dark mt-1">
                          {dadosRelatorio[metrica.key as keyof typeof dadosRelatorio]}
                        </p>
                      </div>
                      <metrica.icon className={`h-8 w-8 ${metrica.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Report Summary */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Receita Bruta:</span>
                  <span className="font-semibold">R$ 45.320,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Custos com Peças:</span>
                  <span className="font-semibold text-error-red">- R$ 12.450,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Descontos Concedidos:</span>
                  <span className="font-semibold text-warning-yellow">- R$ 2.150,00</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Receita Líquida:</span>
                  <span className="text-success-green">R$ 30.720,00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Relatorios;