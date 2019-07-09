import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { SERVICE_URL } from '../config/config';
import { map,catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService) { }

  getCommentsByProduct(id){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/rating/product/" + id;
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e); 
      return of(e)
    }));
  }

  getCommentByUserProduct(userId,itemId){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/rating/user-product/" + userId + "/"+itemId;
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e);      
      return of(e)
    }));
  }

  getLastComments(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/rating/last/4";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e); 
      return of(e)
    }));
  }

  getBestRatedItems(){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/rating/best/3";
    return this.http.get(url,{headers}).pipe(catchError(e =>{
      console.log(e); 
      return of(e)
    }));
  }

  postRatingOnProduct(rating:Rating){
    let headers = new HttpHeaders({
      'token':this._userService.token
    });
    let url = SERVICE_URL + "/rating";

  
    if(rating.id){     
     
      url = url + "/" + rating.id;
      let rawDate = new Date(rating.rating_date);
      let dateToSave = rawDate.getUTCFullYear() + "-" + this.twoDigits(1 + rawDate.getUTCMonth()) + "-" + this.twoDigits(rawDate.getUTCDate()) + " " + this.twoDigits(rawDate.getHours()) + ":" + this.twoDigits(rawDate.getUTCMinutes()) + ":" + this.twoDigits(rawDate.getUTCSeconds());
      rating.rating_date = dateToSave;
      return this.http.put(url,rating,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al publicar tu valoración, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }else {
      let currentDate = new Date();
     
      let dateToSave = currentDate.getUTCFullYear() + "-" + this.twoDigits(1 + currentDate.getUTCMonth()) + "-" + this.twoDigits(currentDate.getUTCDate()) + " " + this.twoDigits(currentDate.getHours()) + ":" + this.twoDigits(currentDate.getUTCMinutes()) + ":" + this.twoDigits(currentDate.getUTCSeconds());
      rating.rating_date = dateToSave;
     
      return this.http.post(url,rating,{headers}).pipe(catchError(e =>{
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert("Error","Ha ocurrido un error al actualizar tu valoración, intentar de nuevo mas tarde ","error");
        return of(e)
      }));
    }
  }

   twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

}
