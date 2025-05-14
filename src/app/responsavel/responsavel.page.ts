import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Responsavel } from 'src/app/models/responsavel.model';

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.page.html',
  styleUrls: ['./responsavel.page.scss']
})
export class ResponsavelPage {
  nome: string = '';
  email1: string = '';
  email2: string = '';
  senha: string = '';

  constructor(private apiService: ApiService) {}

  cadastrar() {
    if (this.email1 !== this.email2) {
      alert('Os e-mails não coincidem!');
      return;
    }

    const responsavel = new Responsavel(
      this.nome,
      this.email1,
      this.senha,
    );

   this.apiService.cadastrarResponsavel(responsavel).subscribe({
  next: (res) => {
    console.log('Cadastro realizado:', res);
    alert('Cadastro realizado com sucesso!');
  },
  error: (err) => {
    console.error('Erro ao cadastrar:', err);
    alert('Erro no cadastro. Tente novamente.');
  },
});
  }
}