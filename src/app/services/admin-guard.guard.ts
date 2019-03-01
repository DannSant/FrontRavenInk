import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ADMIN_ROLE_CODE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(
    public _usuarioService:UserService
  ){}
  canActivate() {
    if (!this._usuarioService.loggedUser){
      return false;
    }
    if(this._usuarioService.loggedUser.role == ADMIN_ROLE_CODE){
      return true;
    } else {
      this._usuarioService.logout();
      return false;
    }
  }
}
