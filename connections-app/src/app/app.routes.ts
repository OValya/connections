import { Routes } from '@angular/router';

export const routes: Routes = [
 // {path:"/", loadComponent:()=>}
  {path: "login", loadComponent: () => import('./auth/pages/login/login.component').then(com => com.LoginComponent)},
  {path: "signup", loadComponent: () => import('./auth/pages/registration/registration.component').then(com => com.RegistrationComponent)},
  {path: "**", loadComponent: () => import('./core/pages/page-not-found/page-not-found.component').then(com => com.PageNotFoundComponent)},
];
