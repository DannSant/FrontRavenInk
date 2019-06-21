import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SERVICE_URL } from '../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryListsService {

  constructor(public _userService:UserService,public _alert:AlertService, public http: HttpClient) { }

  getInventoryListsAll() {
    
    let url = SERVICE_URL + "/inventory-list/list/all";
    return this.http.get(url).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ",
          "error"
        );
        return of(e);
      })
    );
  }

  getCarouselItems() {
    
    let url = SERVICE_URL + "/inventory-list/carousel";
    return this.http.get(url).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ",
          "error"
        );
        return of(e);
      })
    );
  }

  saveList(list){
    let headers = new HttpHeaders({
      token: this._userService.token
    });
    let url = SERVICE_URL + "/inventory-list";

        
    return this.http.post(url, list, { headers }).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al guardar el producto, intentar de nuevo mas tarde ",
          "error"
        );
        return of(e);
      })
    );
     
  }
}
