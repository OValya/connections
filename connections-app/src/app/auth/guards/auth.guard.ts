import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  //console.log('guard', authService.isLoggedIn)

  if(authService.isLoggedIn) return true

  return router.navigate(['/signin']);
};


