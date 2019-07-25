import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { LanguageConfigService } from './language-config.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor( public http:HttpClient,
    public _languageService:LanguageConfigService,
    public _alert:AlertService) { }

  sendEmail(emailBody){
 
    let url = SERVICE_URL + "/email";
    return this.http.post(url,emailBody).pipe(catchError(e =>{
      console.log(e);
      //let errorNumber:number = e.error.error.errno;
      let errorMsg = this._languageService.currentLanguage==this._languageService.SPANISH ? "Ocurrió un error al enviar el mensaje, intenta de nuevo mas tarde" : "Something went wrong, try again later";
      this._alert.showAlert("Error",errorMsg, "error");
      return of(e)
    }));
    
  }
}
