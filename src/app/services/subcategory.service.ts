import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  getSubcategory(id:number){
    let url = SERVICE_URL + "/subcategory/" + id;
    return this.http.get(url).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener la subcategoría, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }

  getAllSubcategories(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/subcategory/list/all?active=false";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las subcategorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }


  getActiveCategories(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/subcategory/list/all?active=true";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las subcategorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }

  getSubcategoriesByCategory(categoryId : string){
    let url = SERVICE_URL + "/subcategory/category/" + categoryId;
    return this.http.get(url).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      this._alert.showAlert("Error","Ha ocurrido un error al obtener las subcategorias, intentar de nuevo mas tarde ","error");
      return of(e)
    }));
  }
  saveSubcategory(subcategory:Subcategory){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/subcategory";


    if(subcategory.id){
      url = url + "/" + subcategory.id;
      return this.http.put(url,subcategory,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al guardar la subcategoria, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }else {
      return this.http.post(url,subcategory,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al guardar la subcategoría, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }
  }
}
