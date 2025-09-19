import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertifyService } from '../shared/services/alertify.service';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);
  // return true;
  if (authService.loggedin()) {
    return true;
  }

  //alertifyService.error('you shall not pass !!');
  router.navigateByUrl('home');
  return false;
};
