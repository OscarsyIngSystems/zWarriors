import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../components/login/login';
import { authGuard } from './guards/auth.guard';
import { Estadisticas } from '../pages/estadisticas/estadisticas';
import { Personajes } from '../pages/personajes/personajes';

export const routes: Routes = [

  {
    path: '',
    component: Login,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: Dashboard,
  },
  {
    path: 'personajes',
    canActivate: [authGuard],
    component: Personajes,
  },
  {
    path: 'estadisticas',
    canActivate: [authGuard],
    component: Estadisticas,
  },

  { path: '**', redirectTo: '' }

];
