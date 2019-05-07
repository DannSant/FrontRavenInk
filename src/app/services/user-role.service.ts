import { Injectable } from '@angular/core';

import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  getAllRoles(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/user-role/list/all";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las subcategorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }
}
