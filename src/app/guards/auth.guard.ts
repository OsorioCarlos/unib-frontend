import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}

  checkUserToken(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = this.authService.checkToken();

    if (!token) {
      this.router.navigateByUrl('/auth');
      return of(false);
    }

    const rolesPermitidos = route.data['expectedRoles'] as string[];

    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return of(true);
    }

    return this.authService.getRol().pipe(
      switchMap((rol) => {
        if (!rolesPermitidos.includes(rol)) {
          this.router.navigateByUrl('/auth');
          return of(false);
        }
        return of(true);
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean> => {
  return inject(PermissionsService).checkUserToken(route);
};
