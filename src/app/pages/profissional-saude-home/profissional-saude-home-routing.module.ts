import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfissionalSaudeHomePage } from './profissional-saude-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalSaudeHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfissionalSaudeHomePageRoutingModule {}
