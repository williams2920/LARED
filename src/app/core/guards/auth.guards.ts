import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/** Permite el paso solo con sesión; si no, redirige a `/login?redirect=<url>`. */
export const authGuard: CanActivateFn = async (_route, state) => {
  const router = inject(Router);
  if (await inject(AuthService).isSignedIn()) return true;
  return router.createUrlTree(['/login'], {
    queryParams: state.url && state.url !== '/' ? { redirect: state.url } : {},
  });
};

/** Evita que un usuario con sesión vuelva a ver el login. */
export const guestGuard: CanActivateFn = async () => {
  const router = inject(Router);
  return (await inject(AuthService).isSignedIn()) ? router.createUrlTree(['/']) : true;
};
