import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  logar() {
    
    this.apiService.loginUsuario(this.email, this.senha).subscribe({
      next: (res) => {
        
        if (res.tipo === 'responsavel') {
          this.router.navigate(['/responsavel-home']);
        } else if (res.tipo === 'profissional') {
          if (res.area === 'SAÚDE') {
            this.router.navigate(['/profissional-saude-home']);
          } else if (res.area === 'EDUCACIONAL') {
            this.router.navigate(['/profissional-educacional-home']);
          }
        }
      },
      error: (err) => {
        alert('Login inválido.');
        console.error(err);
      }
    });
  }
}