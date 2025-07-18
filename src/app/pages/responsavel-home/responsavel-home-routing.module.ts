import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsavelHomePage } from './responsavel-home.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsavelHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsavelHomePageRoutingModule {}
