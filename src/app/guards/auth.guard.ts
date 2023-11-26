import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
class PermissionsService{
    constructor (
        private router: Router,
        private authService: AuthService
    ) {  }

    checkUserToken(): boolean {
        const token = this.authService.checkToken();
        if (!token) {
            this.router.navigateByUrl('/auth');
        }
        return token;
    }
}
export const AuthGuard: CanActivateFn = (): boolean => {
    return inject(PermissionsService).checkUserToken();
}