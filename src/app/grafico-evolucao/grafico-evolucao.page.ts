import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';

// Registra todos os componentes do Chart.js para não dar erro
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evolucao',
  templateUrl: './grafico-evolucao.page.html',
  styleUrls: ['./grafico-evolucao.page.scss'],
})
export class GraficoEvolucaoPage implements OnInit, AfterViewInit {

  // Usamos '!' para dizer ao TypeScript que estes elementos vão existir depois do HTML carregar
  @ViewChild('graficoDiarioCanvas') private graficoDiarioCanvas!: ElementRef;
  @ViewChild('graficoMensalCanvas') private graficoMensalCanvas!: ElementRef;
  
  graficoDiario: any;
  graficoMensal: any;
  idAssistido: number = 0;
  
  // Controle das abas e estado dos dados
  tipoGrafico: string = 'diario'; 
  temDadosDiario: boolean = false;
  temDadosMensal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idAssistido = idParam ? +idParam : 0;
  }

  ngAfterViewInit() {
    if (this.idAssistido > 0) {
      // Carrega o gráfico diário assim que a tela abre
      this.carregarGraficoDiario();
    }
  }

  // Função chamada quando o usuário clica nas abas (Diário / Mensal)
  segmentChanged(event: any) {
    this.tipoGrafico = event.detail.value;
    
    // Pequeno delay para garantir que a div do gráfico está visível antes de desenhar
    if (this.tipoGrafico === 'diario') {
        setTimeout(() => this.carregarGraficoDiario(), 100);
    } else {
        setTimeout(() => this.carregarGraficoMensal(), 100);
    }
  }

  // --- LÓGICA DO GRÁFICO DIÁRIO ---
  carregarGraficoDiario() {
    this.http.get<any[]>(`http://localhost/backend/buscar_dados_grafico.php?id_assistido=${this.idAssistido}`)
      .subscribe(dados => {
        
        if (!dados || dados.length === 0) {
            this.temDadosDiario = false;
            return;
        }
        
        this.temDadosDiario = true;
        const labels = dados.map(d => d.data_formatada);
        const valores = dados.map(d => d.total_pontos);
        
        this.criarGraficoDiario(labels, valores);
      }, error => console.error('Erro Diário:', error));
  }

  criarGraficoDiario(labels: string[], data: number[]) {
    if (this.graficoDiario) this.graficoDiario.destroy();

    this.graficoDiario = new Chart(this.graficoDiarioCanvas.nativeElement, {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [{
          label: 'Pontos Diários',
          data: data,
          borderColor: '#3880ff', // Azul
          backgroundColor: 'rgba(56, 128, 255, 0.2)',
          fill: true,
          tension: 0.3 // Curvatura da linha
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
              beginAtZero: true, 
              suggestedMax: 10, // Escala fixa para ficar bom no mobile
              ticks: { stepSize: 1 } // Apenas números inteiros
          }
        }
      }
    });
  }

  // --- LÓGICA DO GRÁFICO MENSAL ---
  carregarGraficoMensal() {
    this.http.get<any[]>(`http://localhost/backend/buscar_dados_grafico_mensal.php?id_assistido=${this.idAssistido}`)
      .subscribe(dados => {
        
        if (!dados || dados.length === 0) {
            this.temDadosMensal = false;
            return;
        }
        
        this.temDadosMensal = true;
        const labels = dados.map(d => d.mes_ano);
        const valores = dados.map(d => d.media_pontos);
        
        this.criarGraficoMensal(labels, valores);
      }, error => console.error('Erro Mensal:', error));
  }

  criarGraficoMensal(labels: string[], data: number[]) {
    if (this.graficoMensal) this.graficoMensal.destroy();

    this.graficoMensal = new Chart(this.graficoMensalCanvas.nativeElement, {
      type: 'bar', // Barras são melhores para médias mensais
      data: {
        labels: labels,
        datasets: [{
          label: 'Média Mensal',
          data: data,
          backgroundColor: '#2dd36f', // Verde
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
              beginAtZero: true, 
              suggestedMax: 10, 
              title: { display: true, text: 'Média de Pontos' }
          }
        }
      }
    });
  }
}