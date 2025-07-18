import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  // Função chamada pelo botão (click)="logar()"
  logar() {
    // Validação simples para não enviar campos vazios
    if (!this.email || !this.senha) {
      alert('Por favor, preencha e-mail e senha.');
      return;
    }

    // Chama o método de login do serviço de API
    this.apiService.loginUsuario(this.email, this.senha).subscribe({
      // O 'next' é executado quando o backend responde com sucesso (status 200)
      next: (res) => {
        if (res && res.success && res.usuario) {
          
          alert(res.message); // Exibe a mensagem de sucesso

          // Guarda os dados para que o app "lembre" do usuário
          localStorage.setItem('usuarioLogado', JSON.stringify(res.usuario));
          localStorage.setItem('isLoggedIn', 'true');

          // Redireciona o usuário para a página home correta
          if (res.usuario.tipo === 'responsavel') {
            this.router.navigate(['/responsavel-home']); 
          } else if (res.usuario.tipo === 'profissional') {
            this.router.navigate(['/profissional-saude-home']);
          } else {
            this.router.navigate(['/home']); // Página padrão
          }

        } else {
          // Se success for false, mostra a mensagem de erro que o PHP enviou
          alert(res.message || 'E-mail ou senha inválidos.');
        }
      },
      error: (err) => {
        console.error('Erro na requisição de login:', err);
        // Pega a mensagem de erro específica do backend, se existir
        const mensagemErro = err.error?.message || 'Ocorreu um erro de comunicação. Tente novamente.';
        alert(mensagemErro);
      }
    });
  }
}