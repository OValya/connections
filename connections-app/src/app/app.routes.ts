import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:"", loadComponent:()=> import('./connection/pages/main/main.component').then(com=>com.MainComponent)},
  {path:"group/:id", loadComponent:()=> import('./connection/pages/group-dialog/group-dialog.component').then(com=>com.GroupDialogComponent)},

  {path: "signin", loadComponent: () => import('./auth/pages/login/login.component').then(com => com.LoginComponent)},
  {path: "signup", loadComponent: () => import('./auth/pages/registration/registration.component').then(com => com.RegistrationComponent)},
  {path: "profile", loadComponent: () => import('./auth/pages/profile/profile.component').then(com => com.ProfileComponent)},
  {path: "**", loadComponent: () => import('./core/pages/page-not-found/page-not-found.component').then(com => com.PageNotFoundComponent)},
];
