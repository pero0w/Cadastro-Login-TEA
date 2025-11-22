import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ficha-pessoal',
  templateUrl: './ficha-pessoal.page.html',
  styleUrls: ['./ficha-pessoal.page.scss'],
})
export class FichaPessoalPage implements OnInit {

  assistidoId: number = 0;
  assistido: any = null;
  ficha: any[] = [];
  
  isLoading = true;
  modoEdicao = false;
  backupFicha: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    // Verifica se idParam existe antes de converter
    this.assistidoId = idParam ? +idParam : 0;

    if (this.assistidoId > 0) {
        this.carregarDados();
    } else {
        // Se não tiver ID válido, volta para a home
        this.navCtrl.navigateBack('/responsavel-home');
    }
  }

  ionViewDidEnter() {
    // Recarrega se o ID for válido e os dados ainda não estiverem lá
    if (this.assistidoId > 0 && !this.assistido) {
        this.carregarDados();
    }
  }
  
  carregarDados() {
    this.isLoading = true;

    const assistidoRequest = this.http.get(`http://localhost/backend/buscar_assistido.php?id=${this.assistidoId}`);
    const fichaRequest = this.http.get<any[]>(`http://localhost/backend/buscar_ficha_pessoal.php?id_assistido=${this.assistidoId}`);

    forkJoin([assistidoRequest, fichaRequest]).subscribe(
      ([dataAssistido, dataFicha]) => {
        this.assistido = dataAssistido;

        this.ficha = dataFicha.map(item => {
          if (item.tipo_resposta === 'SimNao') {
            item.valor_resposta_bool = (item.valor_resposta === 'Sim');
          }
          return item;
        });

        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        this.mostrarAlerta('Erro', 'Não foi possível carregar os dados da ficha.');
        this.isLoading = false;
      }
    );
  }

  ativarModoEdicao() {
    this.backupFicha = JSON.parse(JSON.stringify(this.ficha));
    this.modoEdicao = true;
  }

  cancelarEdicao() {
    this.ficha = this.backupFicha;
    this.modoEdicao = false;
  }

  async salvarAlteracoes() {
    const respostasParaSalvar = this.ficha.map(item => {
      let valorFinal = item.valor_resposta;
      
      if (item.tipo_resposta === 'SimNao') {
        valorFinal = item.valor_resposta_bool ? 'Sim' : 'Nao';
      }

      return {
        id: item.id,
        valor_resposta: valorFinal
      };
    });

    const payload = {
      id_assistido: this.assistidoId,
      respostas: respostasParaSalvar
    };

    this.http.post('http://localhost/backend/salvar_ficha_pessoal.php', payload)
      .subscribe(
        async (response: any) => {
          if (response.success) {
            await this.mostrarAlerta('Sucesso!', 'Ficha salva.');
            this.modoEdicao = false;
            this.backupFicha = [];
          } else {
            this.mostrarAlerta('Erro', response.message || 'Não foi possível salvar.');
          }
        },
        (error) => {
          this.mostrarAlerta('Erro de Conexão', 'Não foi possível conectar ao servidor.');
        }
      );
  }

  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  irParaQuestionarioDiario() {
    this.router.navigate(['/questionario', this.assistidoId]);
  }

  irParaGraficoProcedimento() {
  this.router.navigate(['/grafico-evolucao', this.assistidoId]);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}