import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/servicios/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor (
        private router: Router,
        private authService: AuthService
    ) {  }

    canActivate(): boolean {
        const token = this.authService.checkToken();
        if (!token) {
            this.router.navigateByUrl('/auth');
        }
        return token;
    }

    canLoad(): boolean {
        const token = this.authService.checkToken();
        if (!token) {
            this.router.navigateByUrl('/auth');
        }
        return token;
    }
}