import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalEducacionalHomePage } from './profissional-educacional-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalEducacionalHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfissionalEducacionalHomePageRoutingModule {}
