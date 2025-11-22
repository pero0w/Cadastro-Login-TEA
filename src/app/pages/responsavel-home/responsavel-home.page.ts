import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-responsavel-home',
  templateUrl: './responsavel-home.page.html',
  styleUrls: ['./responsavel-home.page.scss'],
})
export class ResponsavelHomePage implements OnInit {

  assistidos: any[] = [];
  isLoading = true;
  usuarioLogado: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // 1. Pega o usuário logado (que você salvou no login)
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
    } else {
      // Se não achar, manda de volta pro login
      this.navCtrl.navigateRoot('/login');
    }
  }

  // 2. Usamos ionViewDidEnter para recarregar a lista toda vez que voltar pra tela
  ionViewDidEnter() {
    this.carregarAssistidos();
  }

  carregarAssistidos() {
    if (!this.usuarioLogado) return;

    this.isLoading = true;
    
    // 3. Chama o novo script PHP para buscar os assistidos
    const id_responsavel = this.usuarioLogado.id;
    this.http.get<any[]>(`http://localhost/backend/buscar_meus_assistidos.php?id_responsavel=${id_responsavel}`)
      .subscribe(
        (data) => {
          this.assistidos = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao buscar assistidos:', error);
          this.isLoading = false;
        }
      );
  }
}