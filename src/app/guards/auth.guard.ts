import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Проверка на типа потребител
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
        // Ролята на потребителя не е позволена, пренасочване към началната страница
        this.router.navigate(['/']);
        return false;
      }

      // Оторизиран достъп
      return true;
    }

    // Неоторизиран достъп, пренасочване към страницата за вход
    this.router.navigate(['/login']);
    return false;
  }
  
}
