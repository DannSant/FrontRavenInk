import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    public _usuarioService:UserService,
    public _alert:AlertService,
    public router:Router
  ){}

  canActivate():Promise<boolean> | boolean {

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));


    let expirado = this.expirado(payload.exp);

    if(expirado){
     this._alert.showAlert("Error","Tu sesión ha expirado, vuelve a iniciar sesión","error");
     this._usuarioService.logout();
      return true;
    }



    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaDeExpiracion:number):Promise<boolean>{
    return new Promise((resolve,reject)=>{
      let fechaExp = new Date(fechaDeExpiracion*1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + (4*60*60*1000));

      if(fechaExp.getTime()>ahora.getTime()){
        resolve(true)
      }else {
        this._usuarioService.renuevaToken().subscribe((resp)=>{
          resolve(true)
        },()=>{
          this.router.navigate(['/login'])
          reject(false);
        })
      }
      return resolve(true)
    })
  }

  expirado(fechaDeExpiracion:number){
    //  exp trae la fecha en segundos, hay que convertir los milisegundos de getTime()
    //  a segundo para poder comparar ambas fechas
    let ahora = new Date().getTime()/1000;
    if(fechaDeExpiracion<ahora){
      return true;
    }else {
      return false;
    }
  }
}
