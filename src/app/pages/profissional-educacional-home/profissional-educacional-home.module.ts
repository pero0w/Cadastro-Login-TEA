import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfissionalEducacionalHomePageRoutingModule } from './profissional-educacional-home-routing.module';

import { ProfissionalEducacionalHomePage } from './profissional-educacional-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfissionalEducacionalHomePageRoutingModule
  ],
  declarations: [ProfissionalEducacionalHomePage]
})
export class ProfissionalEducacionalHomePageModule {}
