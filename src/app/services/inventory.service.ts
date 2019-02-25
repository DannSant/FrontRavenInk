import { Injectable } from '@angular/core';

import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable()
export class InventoryService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService
  ) { }


    getInventoryItemsList(list:string){
      let url = SERVICE_URL + "/inventory/query/list/" + list;
      return this.http.get(url).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ","error");        
        return of(e)
      }));
    }

    getItemsBySubcategory(id:number){
      let url = SERVICE_URL + "/inventory/query/subcategory/" + id;
      return this.http.get(url).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ","error");        
        return of(e)
      }));
    }

    getItem(id:number){
      let url = SERVICE_URL + "/inventory/" + id;
      return this.http.get(url).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ","error");        
        return of(e)
      }));
    }

}
