import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfissionalSaudeHomePageRoutingModule } from './profissional-saude-home-routing.module';

import { ProfissionalSaudeHomePage } from './profissional-saude-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfissionalSaudeHomePageRoutingModule
  ],
  declarations: [ProfissionalSaudeHomePage]
})
export class ProfissionalSaudeHomePageModule {}
