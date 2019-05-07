import { Injectable } from "@angular/core";

import { AlertService } from "./alert.service";
import { SERVICE_URL } from "../config/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { InventoryItem } from "../models/inventoryItems";
import { UserService } from "./user.service";

@Injectable()
export class InventoryService {
  constructor(
    public http: HttpClient,
    public _alert: AlertService,
    public _userService: UserService
  ) {}

  getInventoryItemsAll() {
    let headers = new HttpHeaders({
      token: this._userService.token
    });
    let url = SERVICE_URL + "/inventory/list/all";
    return this.http.get(url, { headers }).pipe(
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

  getInventoryItemsList(list: string) {
    let url = SERVICE_URL + "/inventory/query/list/" + list;
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

  getItemsBySubcategory(id: number) {
    let url = SERVICE_URL + "/inventory/query/subcategory/" + id;
    return this.http.get(url).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        if (e.error.code) {
          this._alert.showAlert(
            "Error",
            "No se han encontrado productos de esa categoria",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ",
            "error"
          );
        }
        return of(e);
      })
    );
  }

  getSuggestedItems(id: number) {
    let url = SERVICE_URL + "/inventory/query/suggested/" + id;
    return this.http.get(url).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        if (e.error.code) {
          this._alert.showAlert(
            "Error",
            "No se han encontrado productos de esa categoria",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ",
            "error"
          );
        }
        return of(e);
      })
    );
  }

  getItem(id: number) {
    let url = SERVICE_URL + "/inventory/" + id;
    return this.http.get(url).pipe(
      catchError(e => {
        console.log(e);

        //let errorNumber:number = e.error.error.errno;
        if (e.error.code) {
          this._alert.showAlert(
            "Error",
            "No se han encontrado productos de esa categoria",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al obtener los productos, intentar de nuevo mas tarde ",
            "error"
          );
        }

        return of(e);
      })
    );
  }

  saveItem(item: InventoryItem) {
    let headers = new HttpHeaders({
      token: this._userService.token
    });
    let url = SERVICE_URL + "/inventory";

    if (item.id) {
      url = url + "/" + item.id;
      return this.http.put(url, item, { headers }).pipe(
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
    } else {
      return this.http.post(url, item, { headers }).pipe(
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

  deleteItem(id: string) {
    let headers = new HttpHeaders({
      token: this._userService.token
    });
    let url = SERVICE_URL + "/inventory/" + id;
    return this.http.delete(url, { headers }).pipe(
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
