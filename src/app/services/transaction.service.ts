import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService
  ) { }

  registerTransaction(transaction:Transaction){
    let url = SERVICE_URL + "/transaction";
    return this.http.post(url,transaction).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }

  sendTransactionForm(object:any){
    let url = SERVICE_URL + '/checkout';
    return this.http.post(url,object).pipe(catchError(e =>{
      console.log(e);
      this._alert.showAlert("Error","Error al abrir formulario de pago ","error");
      return of(e)
    }));
  }


}
