import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'responsavel',
    loadChildren: () => import('./responsavel/responsavel.module').then( m => m.ResponsavelPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'profissional',
    loadChildren: () => import('./profissional/profissional.module').then( m => m.ProfissionalPageModule)
  },
  {
    path: 'menu-login',
    loadChildren: () => import('./menu-login/menu-login.module').then( m => m.MenuLoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'responsavel-home',
    loadChildren: () => import('./pages/responsavel-home/responsavel-home.module').then( m => m.ResponsavelHomePageModule)
  },
  {
    path: 'profissional-saude-home',
    loadChildren: () => import('./pages/profissional-saude-home/profissional-saude-home.module').then( m => m.ProfissionalSaudeHomePageModule)
  },
  {
    path: 'profissional-educacional-home',
    loadChildren: () => import('./pages/profissional-educacional-home/profissional-educacional-home.module').then( m => m.ProfissionalEducacionalHomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
