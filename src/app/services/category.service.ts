import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  getCategory(id:string){
    let url = SERVICE_URL + "/category/" + id;
      return this.http.get(url).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al obtener las categorias, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
  }

  getAllCategories(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/category/list/all?active=false";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las categorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }

  getActiveCategories(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/category/list/all?active=true";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las categorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }

  saveCategory(category:Category){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/category";


    if(category.id){
      url = url + "/" + category.id;
      return this.http.put(url,category,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al guardar la categoria, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }else {
      return this.http.post(url,category,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al guardar la categoría, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }
  }



}
