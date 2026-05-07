import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data?.['roles'] ?? [];

  const userRole = authService.getRole();

  if (!userRole) {
    authService.clearSession();
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};