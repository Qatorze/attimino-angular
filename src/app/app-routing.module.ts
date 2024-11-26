import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { preventLoggedInGuard } from './core/guards/prevent-logged-in.guard';

const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () =>
      import('./features/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
    canActivate: [preventLoggedInGuard], //Empèche de sortir d'aller à la page principale de l'application si le user est connecté.
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'auth', // Nuova rotta per il modulo auth
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [preventLoggedInGuard],
  },

  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
