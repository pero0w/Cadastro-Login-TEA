import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
})
export class QuestionarioPage implements OnInit {

  idAssistido: number = 0;
  idResponsavel: number = 0;
  
  // Agora as perguntas e as respostas ficam juntas no mesmo objeto
  perguntas: any[] = [];
  
  isLoading = true;
  bloqueado = false;
  mensagemBloqueio = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // 1. Recupera o ID do assistido da URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idAssistido = idParam ? +idParam : 0;
    
    // 2. Recupera o ID do responsável do login
    const usuarioString = localStorage.getItem('usuarioLogado');
    
    if (usuarioString && this.idAssistido > 0) {
      this.idResponsavel = JSON.parse(usuarioString).id;
      this.verificarStatus(); // Inicia a verificação
    } else {
      // Se faltar dados, volta para a home por segurança
      this.navCtrl.navigateRoot('/responsavel-home');
    }
  }

  verificarStatus() {
    this.isLoading = true;
    
    const url = `http://localhost/backend/verificar_status_questionario.php?id_responsavel=${this.idResponsavel}&id_assistido=${this.idAssistido}`;
    
    this.http.get<any>(url).subscribe(
      res => {
        if (res.pode_responder) {
          this.bloqueado = false;
          this.carregarPerguntas();
        } else {
          this.bloqueado = true;
          this.mensagemBloqueio = res.mensagem;
          this.isLoading = false;
        }
      },
      error => {
        console.error('Erro ao verificar status:', error);
        this.mostrarAlerta('Erro', 'Falha ao verificar disponibilidade. Verifique a conexão.');
        this.isLoading = false;
      }
    );
  }

  carregarPerguntas() {
    this.http.get<any[]>('http://localhost/backend/buscar_perguntas_diarias.php')
      .subscribe(
        data => {
          this.perguntas = data;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao carregar perguntas:', error);
          this.mostrarAlerta('Erro', 'Falha ao carregar perguntas.');
          this.isLoading = false;
        }
      );
  }

  enviarRespostas() {
    const payload = {
      id_responsavel: this.idResponsavel,
      id_assistido: this.idAssistido,
      respostas: this.perguntas
    };

    this.http.post('http://localhost/backend/salvar_respostas_diarias.php', payload)
      .subscribe(
        async (res: any) => {
          if (res.success) { 
            await this.mostrarAlerta('Sucesso', 'Relatório diário salvo!');
            this.navCtrl.back();
          } else {
            this.mostrarAlerta('Erro', res.message || 'O servidor não confirmou o salvamento.');
          }
        },
        (error) => {
            console.error('Erro ao salvar:', error);
            this.mostrarAlerta('Erro', 'Erro de conexão ao tentar salvar.');
        }
      );
  }

  voltar() {
    this.navCtrl.back();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}