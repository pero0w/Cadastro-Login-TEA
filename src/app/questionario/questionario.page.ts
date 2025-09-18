import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QuestionarioService, Pergunta } from '../services/questionario.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
})
export class QuestionarioPage implements OnInit {

  perguntas: Pergunta[] = [];
  respostas: boolean[] = [];

  isLoading = true;
  bloqueado = false;
  mensagemBloqueio = '';

  // IMPORTANTE: Este ID deve vir do seu sistema de login.
  // Depois que o usuário faz login, você deve guardar o ID dele
  // e usá-lo aqui. Por enquanto, estamos usando '1' como exemplo.
  idUsuarioLogado = 1;

  constructor(
    private navCtrl: NavController,
    private questionarioService: QuestionarioService
  ) {}

  ngOnInit() {
    this.checarStatusUsuario();
  }

  checarStatusUsuario() {
    this.isLoading = true;
    this.questionarioService.verificarStatus(this.idUsuarioLogado).subscribe(status => {
      if (status.pode_responder) {
        this.bloqueado = false;
        this.carregarPerguntas();
      } else {
        this.bloqueado = true;
        this.mensagemBloqueio = status.mensagem;
      }
      this.isLoading = false;
    });
  }

  carregarPerguntas() {
    this.questionarioService.getPerguntas().subscribe(data => {
      this.perguntas = data;
      this.respostas = new Array(this.perguntas.length).fill(false);
    });
  }

  enviarRespostas() {
    const dadosParaEnviar = this.perguntas.map((pergunta, index) => ({
      id_pergunta: pergunta.id,
      resposta: this.respostas[index]
    }));

    this.questionarioService.enviarRespostas(this.idUsuarioLogado, dadosParaEnviar).subscribe(
      response => {
        alert("Respostas enviadas com sucesso!");
        this.navCtrl.navigateForward('/graficos');
      },
      error => {
        alert("Ocorreu um erro ao enviar suas respostas.");
        console.error(error);
      }
    );
  }
}