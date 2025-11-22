import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para o ngModel
import { IonicModule } from '@ionic/angular';
import { QuestionarioPageRoutingModule } from './questionario-routing.module';
import { QuestionarioPage } from './questionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionarioPageRoutingModule
  ],
  declarations: [QuestionarioPage]
})
export class QuestionarioPageModule {}